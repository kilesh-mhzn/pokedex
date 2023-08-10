import { useEffect, useState } from "react";
import GenerationSelector from "../components/GenerationSelector";
import PokemonCards from "../components/PokemonCards";
import { useFetch, TApiResponse } from "../hooks/useFetch";

function PokemonListing() {
  // const tabs = [
  //   { id: 1, label: "I" },
  //   { id: 2, label: "II" },
  //   { id: 3, label: "III" },
  //   { id: 4, label: "IV" },
  //   { id: 5, label: "V" },
  //   { id: 6, label: "VI" },
  //   { id: 7, label: "VII" },
  //   { id: 8, label: "VIII" },
  // ];
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const [pokemonData, setPokemonData] = useState([]);

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
      console.log(
        "🚀 ~ file: pokemonListing.tsx:36 ~ generationsWithLabels ~ generationsWithLabels:",
        generationsWithLabels
      );
      setTabs(generationsWithLabels);
    } catch (error) {}
  };

  useEffect(() => {
    fetchGenerations();
  }, []);

  const fetchData = async () => {
    try {
      const pokemonGenerationDetail = await fetch(
        `https://pokeapi.co/api/v2/generation/${currentTab + 1}/`
      );
      const pokemonGenerationDetailData = await pokemonGenerationDetail.json();

      const fetchedPokemonData: any = await Promise.all(
        pokemonGenerationDetailData.pokemon_species.map(
          async (pokemon: any) => {
            try {
              const pokemonSpeciesDetail = await fetch(pokemon.url);
              const pokemonSpeciesDetailData =
                await pokemonSpeciesDetail.json();

              const pokemonDetail = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
              );
              const pokemonDetailData = await pokemonDetail.json();

              const combinedPokemonData = {
                ...pokemonDetailData,
                color: pokemonSpeciesDetailData.color,
              };
              return combinedPokemonData;
            } catch (error) {
              console.log(`Error fetching details for ${pokemon.name}:`, error);
              return null;
            }
          }
        )
      );

      const filteredPokemonData = fetchedPokemonData.filter(
        (pokemon: any) => pokemon !== null
      );

      setPokemonData(filteredPokemonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPokemonData([]);
    fetchData();
  }, [currentTab]);

  return (
    <div>
      <div className="container mx-auto">
        <div className="text-center text-6xl font-extrabold my-6">
          Po
          <span className="underline underline-offset-8 decoration-red-700">
            kéd
          </span>
          ex
        </div>
        <div className="text-center text-blue-600 font-bold text-lg mb-6">
          Select Generation:
        </div>
        <GenerationSelector tabs={tabs} onTabChange={handleTabChange} />
        <PokemonCards pokemons={pokemonData} />
      </div>
    </div>
  );
}

export default PokemonListing;
