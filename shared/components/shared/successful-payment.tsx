"use client";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Title } from "./title";
import Link from "next/link";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

export const SuccessfulPayment = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[100px]">
      <CircleCheck color="green" size={300} />
      <Title text={"Оплата прошла успешно"} size={"lg"} />
      <Title
        text={"Чек о покупке отправим на электронную почту"}
        size={"sm"}
        className="text-gray-400 mb-2"
      />
      <Link href="/">
        <Button
          onClick={() => {
            setTimeout(() => {
              toast.success("Оплата прошла успешно!");
            }, 2000);
          }}
          className=" h-12 text-base w-[300px]"
        >
          Вернуться обратно в магазин
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </Link>
    </div>
  );
};
