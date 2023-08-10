import { useEffect, useState, useContext } from "react";
import GenerationSelector from "../components/GenerationSelector";
import PokemonCards from "../components/PokemonCards";
import Loader from "../components/loader";
import { Pokemon } from "../components/pokemonCard";
import { PokemonContext } from "../contexts/pokemonContext";
import { Logo } from "../components/logo";

function PokemonListing() {
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const { pokemonData, setPokemonData } = useContext(PokemonContext);
  const handleTabChange = (activeTab: number) => {
    setCurrentTab(activeTab);
  };

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

  const fetchData = async () => {
    setLoading(true);

    try {
      const generationUrl = `https://pokeapi.co/api/v2/generation/${
        currentTab + 1
      }/`;
      const generationResponse = await fetch(generationUrl);
      const generationData = await generationResponse.json();

      const fetchedPokemonPromises = generationData.pokemon_species.map(
        async (pokemon: Pokemon) => {
          try {
            const speciesDetailResponse = await fetch(pokemon.url);
            const speciesDetailData = await speciesDetailResponse.json();

            const pokemonDetailUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
            const pokemonDetailResponse = await fetch(pokemonDetailUrl);
            const pokemonDetailData = await pokemonDetailResponse.json();

            const combinedPokemonData = {
              ...pokemonDetailData,
              color: speciesDetailData.color,
            };

            return combinedPokemonData;
          } catch (error) {
            console.error(`Error fetching details for ${pokemon.name}:`, error);
            return null;
          }
        }
      );

      const fetchedPokemonData = await Promise.all(fetchedPokemonPromises);
      const filteredPokemonData = fetchedPokemonData.filter(
        (pokemon) => pokemon !== null
      );

      setPokemonData(filteredPokemonData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentTab]);

  return (
    <div>
      <div className="container mx-auto">
        <Logo />
        <div className="text-center text-blue-600 font-bold text-lg mb-6">
          Select Generation:
        </div>
        <GenerationSelector tabs={tabs} onTabChange={handleTabChange} />
        {loading ? <Loader /> : <PokemonCards pokemons={pokemonData} />}
      </div>
    </div>
  );
}

export default PokemonListing;
