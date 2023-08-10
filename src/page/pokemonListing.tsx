import { useEffect, useState } from "react";
import GenerationSelector from "../components/GenerationSelector";
import PokemonCards from "../components/PokemonCards";
import { useFetch, TApiResponse } from "../hooks/useFetch";

function PokemonListing() {
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
  // const pokemons = [
  //   {
  //     id: 1,
  //     name: "Bulbasaur",
  //     image:
  //       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
  //     pokemonType: ["grass", "fire"],
  //   },
  //   {
  //     id: 1,
  //     name: "Bulbasaur",
  //     image:
  //       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/21.svg",
  //     pokemonType: ["grass", "fire"],
  //   },
  //   {
  //     id: 1,
  //     name: "Bulbasaur",
  //     image:
  //       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
  //     pokemonType: ["grass", "fire"],
  //   },
  //   {
  //     id: 1,
  //     name: "Bulbasaur",
  //     image:
  //       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg",
  //     pokemonType: ["grass", "fire"],
  //   },
  //   {
  //     id: 1,
  //     name: "Bulbasaur",
  //     image:
  //       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/111.svg",
  //     pokemonType: ["grass", "fire"],
  //   },
  // ];
  const [pokemonData, setPokemonData] = useState([]);

  const handleTabChange = (activeTab: number) => {
    setCurrentTab(activeTab);
  };

  // const fetchData = async () => {
  // const { data }: TApiResponse = useFetch(url);
  // console.log("🚀 ~ file: pokemonListing.tsx:64 ~ //fetchData ~ data:", data);
  const fetchData = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/generation/${currentTab + 1}/`;
      const pokemonGenerationDetail = await fetch(url);
      const pokemonGenerationDetailData = await pokemonGenerationDetail.json();
      console.log(
        "🚀 ~ file: pokemonListing.tsx:69 ~ fetchData ~ pokemonGenerationDetailData:",
        pokemonGenerationDetailData
      );

      const fetchedPokemonData: any = await Promise.all(
        pokemonGenerationDetailData.pokemon_species.map(
          async (pokemon: any) => {
            const pokemonSpeciesDetail = await fetch(pokemon.url);
            const pokemonSpeciesDetailData = await pokemonSpeciesDetail.json();

            const pokemonDetail = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            const pokemonDetailData = await pokemonDetail.json();
            const combinedPokemonData = {
              ...pokemonDetailData,
              color: pokemonSpeciesDetailData.color,
            };
            console.log(
              "🚀 ~ file: pokemonListing.tsx:97 ~ combinedPokemonData:",
              combinedPokemonData
            );
            return combinedPokemonData;
          }
        )
      );

      setPokemonData(fetchedPokemonData);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(pokemonData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentTab]);

  return (
    <div>
      <div className="container mx-auto">
        <div className="text-center">Pokédex App</div>
        <div className="text-center text-blue-600 font-bold text-lg:">
          Select Generation:
        </div>
        <GenerationSelector tabs={tabs} onTabChange={handleTabChange} />
        <div>Current Tab: {currentTab + 1}</div>
        <PokemonCards pokemons={pokemonData} />
      </div>
    </div>
  );
}

export default PokemonListing;
