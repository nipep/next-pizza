"use client";

import { SortPopup } from "../shared/sort-popup";
import { Categories } from "./categories";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import { Header } from "./header";
import useDetectedMobile from "@/shared/hooks/use-detected-mobile";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className, categories }) => {
  const { isMobile } = useDetectedMobile();
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories items={categories} />
        {isMobile ? (
          <div className="flex items-center">
            <SortPopup />
          </div>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};
