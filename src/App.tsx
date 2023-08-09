import { useEffect, useState } from "react";
import GenerationSelector from "./components/GenerationSelector";
import PokemonCards from "./components/PokemonCards";
import { useFetch } from "./hooks/useFetch";

interface pokemon {
  name: string;
  url: string;
}

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
  const pokemons = [
    {
      id: 1,
      name: "Bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
      pokemonType: ["grass", "fire"],
    },
    {
      id: 1,
      name: "Bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/21.svg",
      pokemonType: ["grass", "fire"],
    },
    {
      id: 1,
      name: "Bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
      pokemonType: ["grass", "fire"],
    },
    {
      id: 1,
      name: "Bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg",
      pokemonType: ["grass", "fire"],
    },
    {
      id: 1,
      name: "Bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/111.svg",
      pokemonType: ["grass", "fire"],
    },
  ];

  const handleTabChange = (activeTab: number) => {
    setCurrentTab(activeTab);
  };
  const loadData = () => {};
  const [data, loading] = useFetch<pokemon[]>(
    "https://pokeapi.co/api/v2/generation/1",
    []
  );
  useEffect(() => {
    console.log(data);
    console.log(loading);
  }, [data]);
  return (
    <>
      {loading ? "loading" : "not"}

      <div className="background-container"></div>
      <div className="container mx-auto">
        <div onClick={loadData} className="text-center">
          Pokédex App
        </div>
        <div className="text-center text-blue-600 font-bold text-lg:">
          Select Generation:
        </div>
        <GenerationSelector tabs={tabs} onTabChange={handleTabChange} />
        <div>Current Tab: {currentTab + 1}</div>
        <PokemonCards pokemons={pokemons} />
      </div>
    </>
  );
}

export default App;
