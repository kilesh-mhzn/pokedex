import { useEffect, useContext, useState } from "react";
import { IPokemon, PokemonContext } from "../contexts/pokemonContext";

const usePokemonFetch = (currentTab: number | null) => {
  const { pokemonData, isLoading, setIsLoading, setPokemonData, pokemonTeam } =
    useContext(PokemonContext);

  const baseUrl = "https://pokeapi.co/api/v2";

  const [offset, setOffset] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const pokemonUrl = `${baseUrl}/pokemon?limit=20&offset=${offset}`;
      const pokemonResponse = await fetch(pokemonUrl);
      const pokemonData = await pokemonResponse.json();

      const fetchedPokemonPromises = pokemonData.results.map(
        async (pokemon: IPokemon) => {
          try {
            const pokemonDetailResponse = await fetch(pokemon.url);
            const pokemonDetailData = await pokemonDetailResponse.json();

            const speciesDetailUrl = `${baseUrl}/pokemon-species/${pokemon.name}`;
            const speciesDetailResponse = await fetch(speciesDetailUrl);
            const speciesDetailData = await speciesDetailResponse.json();

            const combinedPokemonData = {
              ...pokemonDetailData,
              color: speciesDetailData.color,
              generation: speciesDetailData.generation.name,
              evolution_chain_url: speciesDetailData.evolution_chain.url,
              isInTeam: pokemonTeam.some(
                (teamPokemon) => teamPokemon.id === pokemonDetailData.id
              ),
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

      setPokemonData((prevData) => [...prevData, ...filteredPokemonData]);
      setOffset((offset) => offset + 20);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGenerationData = async () => {
    setOffset(0);
    setIsLoading(true);

    try {
      if (currentTab === null) return;
      const generationUrl = `${baseUrl}/generation/${currentTab + 1}`;
      const generationResponse = await fetch(generationUrl);
      const generationData = await generationResponse.json();

      const fetchedPokemonPromises = generationData.pokemon_species.map(
        async (pokemon: IPokemon) => {
          try {
            const speciesDetailResponse = await fetch(pokemon.url);
            const speciesDetailData = await speciesDetailResponse.json();

            const pokemonDetailUrl = `${baseUrl}/pokemon/${pokemon.name}`;
            const pokemonDetailResponse = await fetch(pokemonDetailUrl);
            const pokemonDetailData = await pokemonDetailResponse.json();

            const combinedPokemonData = {
              ...pokemonDetailData,
              color: speciesDetailData.color,
              generation: speciesDetailData.generation.name,
              evolution_chain_url: speciesDetailData.evolution_chain.url,
              isInTeam: pokemonTeam.some(
                (teamPokemon) => teamPokemon.id === pokemonDetailData.id
              ),
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
      setIsLoading(false);
    }
  };

  const handleScroll = (e: any) => {
    const shouldLoadData =
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight;

    if (shouldLoadData && currentTab === null) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset, pokemonTeam]);

  useEffect(() => {
    if (currentTab !== null) {
      fetchGenerationData();
    } else {
      fetchData();
    }
  }, [currentTab, pokemonTeam]);

  return { isLoading, pokemonData };
};

export default usePokemonFetch;
