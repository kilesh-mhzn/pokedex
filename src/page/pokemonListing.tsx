import { useEffect, useState, useContext } from "react";
import GenerationSelector from "../components/GenerationSelector";
import PokemonCards from "../components/PokemonCards";
import Loader from "../components/loader";
import { Logo } from "../components/logo";
import usePokemonFetch from "../hooks/usePokemonFetch";

function PokemonListing() {
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleTabChange = (activeTab: number) => {
    setCurrentTab(activeTab);
  };

  const { loading, pokemonData } = usePokemonFetch(currentTab);

  const fetchGenerations = async () => {
    try {
      const generationsData = await fetch(
        `https://pokeapi.co/api/v2/generation/`
      );
      const generations = await generationsData.json();
      const generationsWithLabels = generations.results.map(
        (generation: any) => ({
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
      <Logo />
      <div className="text-center text-blue-600 font-bold text-lg mb-6">
        Select Generation:
      </div>
      <GenerationSelector tabs={tabs} onTabChange={handleTabChange} />
      {loading ? <Loader /> : <PokemonCards pokemons={pokemonData} />}
    </div>
  );
}

export default PokemonListing;
