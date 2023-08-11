import { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabProps {
  tabs: Tab[];
  onTabChange?: (activeTab: number) => void;
}

const RamroTabs: React.FC<TabProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
    if (onTabChange) {
      onTabChange(tabIndex);
    }
  };

  return (
    <div className="mb-6">
      <div className="relative  font-semibold border-b-2 h-[28px]">
        <div className="flex gap-4 absolute">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                activeTab === index ? " border-b-4 border-b-blue-500" : ""
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default RamroTabs;
