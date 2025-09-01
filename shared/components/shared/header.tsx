"use client";

import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./searchInput";
import { CartButton } from "./cart-button";
import { useSession, signIn } from "next-auth/react";
import { ProfileButton } from "./profile-button";
import { useEffect, useState } from "react";
import { AuthModal } from "./modals/auth-modal/auth-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDetectedMobile from "@/shared/hooks/use-detected-mobile";
import toast from "react-hot-toast";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}
export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  const searchParams = useSearchParams();
  const { isMobile } = useDetectedMobile();

  useEffect(() => {
    if (pathname.includes("/profile")) {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, [pathname]);

  useEffect(() => {
    let toastMessage = "";
    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }),
    [];

  return (
    <header className={cn("border-b border-gray-100", className)}>
      {isMobile ? (
        <Container className="flex py-4 flex-col justify-center gap-4">
          <Link href="/">
            <div className="flex flex-row justify-center gap-2">
              <Image width={35} height={35} src={logo} alt="Logo" />
              <div>
                <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                <p className="text-sm text-gray-400 leading-3">
                  вкусней уже некуда
                </p>
              </div>
            </div>
          </Link>
          <div
            className={cn("flex justify-center items-center gap-3", {
              "justify-between": hasCart,
            })}
          >
            <AuthModal
              isOpen={openAuthModal}
              onClose={() => setOpenAuthModal(false)}
            />
            <ProfileButton onClickSignClick={() => setOpenAuthModal(true)} />
            {hasCart && <CartButton />}
          </div>
          {!isProfile
            ? hasSearch && (
                <div className="xl:mx-10 mx-0 flex-1">
                  <SearchInput />
                </div>
              )
            : ""}
        </Container>
      ) : (
        <Container className="flex py-8 justify-between items-center">
          <Link href="/">
            <div className="flex flex-row gap-2">
              <Image width={35} height={35} src={logo} alt="Logo" />
              <div>
                <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                <p className="text-sm text-gray-400 leading-3">
                  вкусней уже некуда
                </p>
              </div>
            </div>
          </Link>
          {!isProfile
            ? hasSearch && (
                <div className="mx-10 flex-1 ">
                  <SearchInput />
                </div>
              )
            : ""}
          <div className="flex items-center gap-3">
            <AuthModal
              isOpen={openAuthModal}
              onClose={() => setOpenAuthModal(false)}
            />
            <ProfileButton onClickSignClick={() => setOpenAuthModal(true)} />
            {hasCart && <CartButton />}
          </div>
        </Container>
      )}
    </header>
  );
};
