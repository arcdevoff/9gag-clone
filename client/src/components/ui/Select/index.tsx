"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Option, SelectProps } from "./types";
import { ChevronDown, ChevronUp } from "lucide-react";

const Select = ({
  selected,
  onChange,
  label,
  options,
  wrapperClassName = "",
  triggerClassName = "",
  dropdownClassName = "",
  optionClassName = "",
  labelClassName = "",
  optionActiveClassName = "!bg-stone-900",
}: SelectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>();

  useEffect(() => {
    setSelectedOption(options.find((obj) => obj.value === selected));
  }, [selected, options]);

  return (
    <div className={`relative font-medium ${wrapperClassName}`}>
      <button
        onBlur={() => setOpen(false)}
        className={`flex items-center justify-between rounded-xl ${triggerClassName}`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          {selectedOption ? (
            <>
              {selectedOption.image && (
                <Image
                  width={100}
                  height={100}
                  src={selectedOption.image}
                  alt="label image"
                  className="rounded-xl size-7.5"
                  quality={100}
                />
              )}

              {selectedOption.icon}
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <>
              <span className={`${labelClassName}`}>{label}</span>
            </>
          )}
        </div>

        {open ? (
          <ChevronUp className="opacity-15" />
        ) : (
          <ChevronDown className="opacity-15" />
        )}
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.preventDefault()}
          className={`flex flex-col items-center rounded-xl gap-1 absolute max-h-40 overflow-auto z-50 ${dropdownClassName}`}
        >
          {options.map((option, index) => (
            <button
              className={`flex items-center w-full rounded-xl gap-3 ${
                selected === option.value && optionActiveClassName
              } ${optionClassName}`}
              key={index}
              onClick={() => {
                setOpen(false);
                onChange(option);
              }}
            >
              {option.image && (
                <Image
                  src={option.image}
                  width={30}
                  height={30}
                  alt={option.label}
                  className="rounded-xl"
                />
              )}

              {option.icon}

              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
