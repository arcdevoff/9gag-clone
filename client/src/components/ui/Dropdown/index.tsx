"use client";
import { useState } from "react";

type Item = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
};

type DropdownProps = {
  items: Item[];
  trigger: React.ReactNode;
  wrapperClassName?: string;
  itemClassName?: string;
  dropdownClassName?: string;
};

const Dropdown = ({
  items,
  trigger,
  wrapperClassName,
  dropdownClassName,
  itemClassName,
}: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={`relative z-50 ${wrapperClassName}`}>
      <button onClick={() => setOpen(!open)}>{trigger}</button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.preventDefault()}
          className={`absolute flex flex-col right-0 p-1 rounded-lg font-medium ${dropdownClassName}`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className={`flex items-center flex-row w-max min-w-full gap-2.5 py-1 px-3 rounded-lg ${itemClassName}`}
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
            >
              {item?.icon ? item.icon : ""}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
