"use client";

import { Suspense, useEffect, useState } from "react";
import { Filters } from "./filters";
import useDetectedMobile from "@/shared/hooks/use-detected-mobile";

export const Filter = () => {
    const { isMobile } = useDetectedMobile();

  return (
    <>
      {!isMobile ? (
        <div className="w-[250px]">
          <Suspense>
            <Filters />
          </Suspense>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

