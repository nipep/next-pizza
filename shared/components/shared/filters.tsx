"use client";

import { cn } from "@/shared/lib/utils";
import React, { useState, useEffect } from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filter-group";
import { PriceProps, useFilter } from "@/shared/hooks/use-filter";
import { useIngredients } from "@/shared/hooks/use-ingredients";
import { useQueryFilters } from "@/shared/hooks/use-query-filters";

interface Props {
  className?: string;
}

export const Filters: React.FC<React.PropsWithChildren<Props>> = ({
  className,
}) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilter();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div>
      <Title text="Фильтрация" size="sm" className="mb-5 font-extrabold" />
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="mb-5"
        title="Тип теста"
        selectedValues={filters.pizzaTypes}
        onClickCheckbox={filters.setPizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5 border-t border-t-neutral-100 pt-6"
        title="Размеры"
        selectedValues={filters.sizes}
        onClickCheckbox={filters.setSizes}
        items={[
          { text: "25 см", value: "25" },
          { text: "30 см", value: "30" },
          { text: "35 см", value: "35" },
        ]}
      />
      <div className="mt-5 border-t border-t-neutral-100 pt-6">
        <p className="mb-3 font-bold">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        ></RangeSlider>
        <div className="border-t border-t-neutral-100 mt-10 pt-6">
          <CheckboxFiltersGroup
            title="Ингредиенты"
            name="ingredients"
            limit={5}
            defaultItems={items.slice(0, 6)}
            items={items}
            loading={loading}
            onClickCheckbox={filters.SetSelectedIngredients}
            selectedValues={filters.selectedIngredients}
          />
        </div>
      </div>
    </div>
  );
};
