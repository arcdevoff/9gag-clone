export type Option = {
  value: any;
  label: string;
  icon?: React.ReactNode;
  image?: string;
};

export interface SelectProps {
  label: string;
  selected: any;
  onChange: (option: Option) => void;
  options: Option[];
  wrapperClassName?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  optionActiveClassName?: string;
  labelClassName?: string;
}
