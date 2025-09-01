import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { signIn } from "next-auth/react";
import { LoginForm } from "./forms/login-form";
import { useState } from "react";
import { RegisterForm } from "./forms/register-form";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const AuthModal: React.FC<Props> = ({ className, isOpen, onClose }) => {
  const isKeyboardOpen = useDetectKeyboardOpen();
  const [type, setType] = useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className=" sm:w-[450px] w-[320px] bg-white p-10">
        {type === "login" ? (
          <LoginForm onClose={onClose} />
        ) : (
          <RegisterForm onClose={onClose} />
        )}
        {!isKeyboardOpen && (
          <>
            <hr />
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() =>
                  signIn("github", {
                    callbackUrl: "/",
                    redirect: true,
                  })
                }
                type="button"
                className="gap-2 h-12 p-2 flex-1"
              >
                <img
                  className="w-6 h-6"
                  src="https://github.githubassets.com/favicons/favicon.svg"
                />
                GitHub
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/",
                    redirect: true,
                  })
                }
                type="button"
                className="gap-2 h-12 p-2 flex-1"
              >
                <img
                  className="w-6 h-6"
                  src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                />
                Google
              </Button>
            </div>
            <Button
              variant={"outline"}
              onClick={onSwitchType}
              type="button"
              className="h-12"
            >
              {type != "login" ? "Войти" : "Регистрация"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
