import { useState } from "react";

interface Tab {
  id: number;
  label: string;
}

interface TabProps {
  tabs: Tab[];
  onTabChange?: (activeTab: number) => void;
}

const GenerationSelector: React.FC<TabProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
    if (onTabChange) {
      onTabChange(tabIndex);
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex shadow dark:bg-slate-800 bg-slate-50 rounded font-semibold">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`w-[44px] flex justify-center py-2 cursor-pointer hover:bg-slate-200 
             first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br 
            ${activeTab === index ? " border-b-4 border-b-blue-500" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerationSelector;
