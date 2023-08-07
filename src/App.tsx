import { useState } from "react";
import GenerationSelector from "./components/generationSelector";

function App() {
  const tabs = [
    { id: 1, label: "I" },
    { id: 2, label: "II" },
    { id: 3, label: "III" },
    { id: 4, label: "IV" },
    { id: 5, label: "V" },
    { id: 6, label: "VI" },
    { id: 7, label: "VII" },
    { id: 8, label: "VIII" },
  ];
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleTabChange = (activeTab: number) => {
    setCurrentTab(activeTab);
  };
  return (
    <>
      <div className="background-container"></div>
      <div className="container mx-auto">
        <div className="text-center">Pokédex App</div>
        <GenerationSelector tabs={tabs} onTabChange={handleTabChange} />
        <div>Current Tab: {currentTab + 1}</div>
      </div>
    </>
  );
}

export default App;
