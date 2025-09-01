import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../../form/forrm-input";
import { Button } from "@/shared/components/ui/button";
import toast from "react-hot-toast";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { registerUser } from "@/app/actions";
import { cn } from "@/shared/lib/utils";
import useDetectedMobile from "@/shared/hooks/use-detected-mobile";

interface Props {
  onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const { isMobile } = useDetectedMobile();
  const isKeyboardOpen = useDetectKeyboardOpen();
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Регистрация прошла успешна. Подтвердите свою почту"),
        {
          icon: "✅",
        };

      onClose?.();
    } catch (error) {
      console.error("Error [REGISTR]", error);
      toast.error("Не удалось зарегистрировать аккаунт", {
        icon: "❌",
      });
    }
  };
  return (
    <FormProvider {...form}>
      <form
        className={cn(
          "flex flex-col gap-5",
          isKeyboardOpen && isMobile
            ? "h-[calc(100%-35%)] overflow-y-scroll"
            : ""
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};

