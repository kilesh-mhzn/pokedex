import { useState, useEffect } from "react";
import { Pokemon } from "../components/pokemonCard";

const usePokemonFetch = (currentTab: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
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
              console.error(
                `Error fetching details for ${pokemon.name}:`,
                error
              );
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

    fetchData();
  }, [currentTab]);

  return { loading, pokemonData };
};

export default usePokemonFetch;
