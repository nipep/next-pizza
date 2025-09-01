"use client";
import { cn } from "@/shared/lib/utils";
import React, { Component, useEffect, useState } from "react";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ className, items }) => {
  const categoryActiveId = useCategoryStore((state) => state.activityId);
  return (
    //
    <div
      className={cn(
        "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl overflow-y-auto scrollbar md:w-[525px] w-[calc(100%-10rem)]",
        className
      )}
    >
      {items.map(({ name, id }, index) => (
        <a
          key={index}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            id === categoryActiveId &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/#${name}`}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
