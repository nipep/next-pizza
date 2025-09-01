"use client";
import { Title } from "@/shared/components/shared/title";
import { useCart } from "@/shared/hooks/use-cart";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutCart } from "@/shared/components/shared/checkout/checkout-cart";
import { CheckoutPersonalForm } from "@/shared/components/shared/checkout/checkout-personal-form";
import { CheckoutAddressForm } from "@/shared/components/shared/checkout/checkout-address-form";
import {
  CheckoutFormSchema,
  CheckoutFormValues,
} from "@/shared/constants/checkout-form-schema";
import { createOrder } from "@/app/actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { CheckoutSidebar } from "@/shared/components/shared/checkout-sidebar";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { totalAmount, items, loading, removeCartItem, onClickCountButton } =
    useCart();
  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      email: "",
      firstName: session?.user.name || "",
      lastName: "",
      phone: "",
      addres: "",
      comment: "",
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();

      const [firstName, lastName] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error("Заказ успешно оформлен! 📝 Переход на оплату... ", {
        icon: "✅",
      });

      if (url != null) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      toast.error("Не удалось создать заказ", {
        icon: "❌",
      });
    }
  };

  return (
    <>
      <Title
        text="Оформление заказа"
        className="font-extrabold md:mb-8 mb-2 md:text-[36px] text-[28px] sm:text-left text-center"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex lg:gap-10 gap-5 flex-col lg:flex-row ">
            <div className="flex flex-col lg:gap-10 gap-5 flex-1 lg:mb-20 mb-0">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />
              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
              <CheckoutAddressForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>
            <div className="lg:w-[450px] w-full lg:mb-0 mb-4">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
