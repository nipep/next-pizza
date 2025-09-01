"use client";

import { Filters } from "./filters";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ArrowDown } from "lucide-react";
import { Suspense } from "react";

interface Props {}

export const CartDrawerFilter: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-white" widthClassName="w-full ">
        <DrawerHeader>
          <DrawerClose>
            <div className="fixed bg-gray-100 w-full -m-4 p-3 group">
              <ArrowDown
                width={30}
                className="transition duration-300 group-hover:translate-y-1"
              />
            </div>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-row justify-center xl:pl-[40px] pl-[30px] overflow-y-scroll h-[calc(100%-4rem)] my-5">
          <Suspense>
            <Filters />
          </Suspense>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
