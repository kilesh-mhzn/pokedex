import { useEffect, useState } from "react";
import GenerationSelector from "../components/GenerationSelector";
import PokemonCards from "../components/PokemonCards";
import Loader from "../components/loader";
import { Logo } from "../components/logo";
import usePokemonFetch from "../hooks/usePokemonFetch";
import RamroDrawer from "../components/RamroDrawer";
import { PokemonTeams } from "../components/drawers/PokemonTeams";
import { IGeneration } from "../contexts/pokemonContext";
import { IconBagpack } from "../components/icons";

function PokemonListing() {
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleTabChange = (activeTab: number | null) => {
    setCurrentTab(activeTab);
  };

  const { pokemonData, isLoading } = usePokemonFetch(currentTab);

  const fetchGenerations = async () => {
    try {
      const generationsData = await fetch(
        `https://pokeapi.co/api/v2/generation/`
      );
      const generations = await generationsData.json();
      const generationsWithLabels = generations.results.map(
        (generation: IGeneration) => ({
          ...generation,
          label: generation.name.replace("generation-", "").toUpperCase(),
        })
      );
      setTabs(generationsWithLabels);
    } catch (error) {}
  };

  useEffect(() => {
    fetchGenerations();
  }, []);

  return (
    <div className="container mx-auto mb-12">
      <div className="relative flex flex-col md:flex-row md:justify-center items-center">
        <div></div>
        <Logo />
        <div></div>
      </div>
      <div className="text-center text-blue-600 font-bold text-lg mb-2">
        Select Generation:
      </div>
      <GenerationSelector tabs={tabs} onTabChange={handleTabChange} />
      {isLoading && <Loader />}
      {<PokemonCards pokemons={pokemonData} />}
      <button
        className={`fixed bottom-[40px] z-[40] right-[4%] p-4 rounded-full shadow-2xl 
        bg-slate-100 text-white-100 dark:text-white-100 dark:bg-slate-800`}
        onClick={toggleDrawer}
        title="View Team"
      >
        <img src="/pokeballs.png" alt="" />
      </button>
      <RamroDrawer isOpen={drawerOpen} onClose={toggleDrawer}>
        <PokemonTeams />
      </RamroDrawer>
    </div>
  );
}

export default PokemonListing;
