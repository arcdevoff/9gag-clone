import { Tab } from "./types";

type TabsProps = {
  tabs: Tab[];
  value: string;
  onChange: (key: string) => void;
  className?: string;
};

const Tabs = ({ tabs, value, onChange, className = "" }: TabsProps) => {
  return (
    <div className={`flex flex-row items-center font-medium ${className}`}>
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`${
            value === t.key ? "bg-stone-800" : "bg-stone-900"
          }  hover:bg-stone-800 transition-colors h-10 rounded-xl w-full sm:w-30 first:rounded-r-none last:rounded-l-none border-1 border-stone-900/100`}
        >
          {t.text}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
