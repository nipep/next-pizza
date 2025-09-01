"use server";

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared/shared-templates/pay-order-template";
import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { sendEmail } from "@/shared/lib/send-email";
import { OrderStatus, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { OrderSuccess } from "@/shared/components/shared/shared-templates/order-success";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { getUserSession } from "@/shared/lib/get-user-session";
import { hashSync } from "bcrypt";
import { VerificationUser } from "@/shared/components/shared/shared-templates/verification-user";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/constants/auth-options";
import { createPayment } from "@/shared/lib/create-payment";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;
    const session = await getServerSession(authOptions);

    if (!cartToken) {
      throw new Error("Cart token not found");
    }
    // Находим корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
      where: {
        token: cartToken,
      },
    });
    //   делаем проверку и ворзвращаем ошибки
    if (!userCart) {
      throw new Error("Cart is not found");
    }
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }
    // создаем заказ
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        userId: Number(session?.user.id),
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.addres,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });
    // очищаем корзину
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: "Оплата заказа №" + order.id,
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      "NEXT PIZZA / Оплата заказ #" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );
    return paymentUrl;

  } catch (err) {
    console.log("[CreateOrder] Server error", err);
    throw err;
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Пользователь не найден");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.error("[Error UPDATE USER]", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтверждена");
      }

      throw new Error("Пользователь уже существует");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "Next Pizza / Подтверждение регистрации",
      VerificationUser({
        code,
      })
    );
  } catch (error) {
    console.error("[Error CREATE USER]", error);
    throw error;
  }
}
