import { useEffect, useState } from "react";
import GenerationSelector from "../components/GenerationSelector";
import PokemonCards from "../components/PokemonCards";
import Loader from "../components/loader";
import { Logo } from "../components/logo";
import usePokemonFetch from "../hooks/usePokemonFetch";
import RamroDrawer from "../components/RamroDrawer";
import { PokemonTeams } from "../components/drawers/PokemonTeams";
import { IGeneration } from "../contexts/pokemonContext";

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
        <div>
          <button
            className="md:absolute right-0 bottom-1/2 md:translate-y-1/2 bg-slate-800 text-white-100 dark:text-white-100 dark:bg-slate-800"
            onClick={toggleDrawer}
          >
            My Team
          </button>
        </div>
      </div>
      <div className="text-center text-blue-600 font-bold text-lg mb-2">
        Select Generation:
      </div>
      <GenerationSelector tabs={tabs} onTabChange={handleTabChange} />
      {isLoading && <Loader />}
      {<PokemonCards pokemons={pokemonData} />}
      <RamroDrawer isOpen={drawerOpen} onClose={toggleDrawer}>
        <PokemonTeams />
      </RamroDrawer>
    </div>
  );
}

export default PokemonListing;
