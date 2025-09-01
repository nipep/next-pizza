"use client";
import React from "react";
import { Input } from "../ui/input";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Skeleton } from "../ui/skeleton";

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  loading?: boolean;
  selectedValues?: Set<string>;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  className?: string;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  loading,
  onClickCheckbox,
  selectedValues,
  defaultValue,
  className,
  name,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(" ");

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton className="w-full h-6 mb-4 rounded-[8px]" />
          ))}
        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : (defaultItems || items)?.slice(0, limit);

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      <div className="mb-5">
        {showAll && (
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={onChangeSearchInput}
          />
        )}
      </div>
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((items, index) => (
          <FilterCheckbox
            key={index}
            text={items.text}
            value={items.value}
            name={name}
            endAdornment={items.endAdornment}
            checked={selectedValues?.has(items.value)}
            onCheckedChange={() => onClickCheckbox?.(items.value)}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
