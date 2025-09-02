import { prisma } from "@/prisma/prisma-client";
import { authOptions } from "@/shared/constants/auth-options";
import { OrderStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Вы не авторизованы" },
        { status: 401 }
      );
    }
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        totalAmount: true,
        address: true,
        items: true,
        updatedAt: true,
      },
      where: {
        userId: Number(session?.user.id),
        status: OrderStatus.SUCCEEDED,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "[UESERS-ORDERS_GET] Server error" },
      { status: 500 }
    );
  }
}
