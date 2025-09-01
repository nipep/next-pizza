"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { updateUserInfo } from "@/app/actions";
import {
  formRegisterSchema,
  TFormRegisterValues,
} from "./modals/auth-modal/forms/shemas";
import { FormInput } from "./form/forrm-input";
import { Button } from "../ui/button";
import { ProfileOrder } from "./profile-order";
import { useUsersOrders } from "@/shared/hooks/use-users-orders";
import { Skeleton } from "../ui/skeleton";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const { orders, loading } = useUsersOrders();

  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error("Данные обновлены 📝", {
        icon: "✅",
      });
    } catch (error) {
      return toast.error("Ошибка при обновлении данных", {
        icon: "❌",
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <>
      <Container className="my-10">
        <Title
          text={`Личные данные | #${data.id}`}
          size="md"
          className="font-bold"
        />

        <FormProvider {...form}>
          <form
            className="flex flex-col sm:gap-5 gap-2 sm:w-96 w-full sm:mt-10 mt-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput name="email" label="E-Mail" required />
            <FormInput name="fullName" label="Полное имя" required />

            <FormInput
              type="password"
              name="password"
              label="Новый пароль"
              required
            />
            <FormInput
              type="password"
              name="confirmPassword"
              label="Повторите пароль"
              required
            />

            <Button
              disabled={form.formState.isSubmitting}
              className="text-base sm:mt-10 mt-5"
              type="submit"
            >
              Сохранить
            </Button>

            <Button
              onClick={onClickSignOut}
              variant="secondary"
              disabled={form.formState.isSubmitting}
              className="text-base"
              type="button"
            >
              Выйти
            </Button>
          </form>
        </FormProvider>
      </Container>
      <div className="gap-5">
        <Container>
          <Title text="Мои заказы" size="md" className="font-bold mb-10" />
        </Container>
        {loading ? (
          <Container className="sm:my-10 my-5">
            <Skeleton className="sm:w-96 w-full sm:my-10 my-5 h-[295px] rounded-3xl" />
            <Skeleton className="sm:w-96 w-full sm:my-10 my-5 h-[295px] rounded-3xl" />
            <Skeleton className="sm:w-96 w-full sm:my-10 my-5 h-[295px] rounded-3xl" />
          </Container>
        ) : (
          <ProfileOrder orders={orders} />
        )}
      </div>
    </>
  );
};
