import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { CircleUser, User } from "lucide-react";
import { useCartStore } from "@/shared/store/cart";
import Link from "next/link";

interface Props {
  onClickSignClick?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignClick,
}) => {
  const { loading } = useCartStore();
  const { data: session } = useSession();
  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignClick}
          variant={"outline"}
          className="flex items-center"
          loading={loading}
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            loading={loading}
          >
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
