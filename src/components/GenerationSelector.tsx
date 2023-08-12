import { useContext, useState } from "react";
import { IconClose } from "./icons";
import { PokemonContext } from "../contexts/pokemonContext";

interface Tab {
  id: number;
  label: string;
}

interface TabProps {
  tabs: Tab[];
  onTabChange?: (activeTab: number | null) => void;
}

const GenerationSelector: React.FC<TabProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const { setPokemonData } = useContext(PokemonContext);
  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
    if (onTabChange) {
      onTabChange(tabIndex);
    }
  };
  const clearFilter = () => {
    setPokemonData([]);
    setActiveTab(null);
    if (onTabChange) {
      onTabChange(null);
    }
  };

  return (
    <div className="flex justify-center mb-8 items-center gap-3">
      <div className="flex shadow dark:bg-slate-800 bg-slate-50 rounded font-semibold">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`w-[30px] sm:w-[44px] text-xs sm:text-base flex justify-center py-2 cursor-pointer hover:bg-slate-200 
             first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br 
            ${activeTab === index ? " border-b-4 border-b-blue-500" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {activeTab !== null ? (
        <div onClick={clearFilter} className="cursor-pointer">
          <IconClose size="1.5em" color="#000" />
        </div>
      ) : null}
    </div>
  );
};

export default GenerationSelector;
