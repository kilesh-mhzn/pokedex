import { useEffect, useContext } from "react";
import { Pokemon } from "../components/pokemonCard";
import { PokemonContext } from "../contexts/pokemonContext";

const usePokemonFetch = (currentTab: number | null) => {
  // const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const { pokemonData, isLoading, setIsLoading, setPokemonData } =
    useContext(PokemonContext);

  const baseUrl = "https://pokeapi.co/api/v2";

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const pokemonUrl = `${baseUrl}/pokemon`;
      const pokemonResponse = await fetch(pokemonUrl);
      const pokemonData = await pokemonResponse.json();

      const fetchedPokemonPromises = pokemonData.results.map(
        async (pokemon: Pokemon) => {
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

  const fetchGenerationData = async () => {
    setIsLoading(true);

    try {
      const generationUrl = `${baseUrl}/generation/${currentTab + 1}`;
      const generationResponse = await fetch(generationUrl);
      const generationData = await generationResponse.json();

      const fetchedPokemonPromises = generationData.pokemon_species.map(
        async (pokemon: Pokemon) => {
          try {
            const speciesDetailResponse = await fetch(pokemon.url);
            const speciesDetailData = await speciesDetailResponse.json();

            const pokemonDetailUrl = `${baseUrl}/pokemon/${pokemon.name}`;
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentTab !== null) {
      fetchGenerationData();
    } else {
      fetchData();
    }
  }, [currentTab]);

  return { isLoading, pokemonData };
};

export default usePokemonFetch;
