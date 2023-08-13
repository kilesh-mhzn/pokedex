import { useContext, useEffect, useState } from "react";
import { Pokemon } from "../pokemonCard";
import { PokemonContext } from "../../contexts/pokemonContext";
import { IconRightChevron } from "../icons";

interface IProps {
  pokemon: Pokemon;
}
interface IEvolution {
  species: {
    name: string;
  };
  evolves_to: any[];
}
const EvolutionDetails = ({ pokemon }: IProps) => {
  const [evolutionChain, setEvolutionChain] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const { pokemonData } = useContext(PokemonContext);

  const [pokemonEvolutions, setPokemonEvolutions] = useState<any[]>([]);

  const fetchEvolutionChain = async () => {
    try {
      const evolutionChainResponse = await fetch(pokemon.evolution_chain_url);
      const evolutionChainData = await evolutionChainResponse.json();
      setEvolutionChain(evolutionChainData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvolutionChain();
  }, []);

  const addEvolutionsRecursively = (evolution: IEvolution) => {
    const speciesName = evolution.species.name;
    const foundPokemon = pokemonData.find(
      (pokemon) => pokemon.name === speciesName
    );

    const isNameAlreadyAdded = pokemonEvolutions.some(
      (pokemon) => pokemon.name === speciesName
    );

    if (foundPokemon && !isNameAlreadyAdded) {
      setPokemonEvolutions((prevEvolutions) => [
        ...prevEvolutions,
        {
          name: speciesName,
          pokemonImg: foundPokemon.sprites.other.dream_world.front_default,
        },
      ]);
    }

    if (evolution.evolves_to && evolution.evolves_to.length > 0) {
      evolution.evolves_to.forEach((nextEvolution: any) => {
        addEvolutionsRecursively(nextEvolution);
      });
    }
  };
  useEffect(() => {
    if (evolutionChain) {
      addEvolutionsRecursively(evolutionChain.chain);
    }
  }, [evolutionChain, pokemonData]);

  const renderEvolutionChain = (chain: any) => {
    return (
      <div>
        {chain.species.name}
        {chain.evolves_to.map((evolution: any) => (
          <div key={evolution.species.name}>
            {renderEvolutionChain(evolution)}
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      {isLoading ? (
        <img
          src="\pokeball.svg"
          className="fill-slate-300 w-28 mx-auto animate-spin relative z-[1000]"
        />
      ) : (
        <div className="flex overflow-auto justify-between items-baseline">
          {pokemonEvolutions.map((pokemon, index) => (
            <>
              <div className="" key={index}>
                <div className="flex flex-col items-center gap-2">
                  <img width={90} src={pokemon.pokemonImg} alt="" />
                  <div className="capitalize font-semibold">{pokemon.name}</div>
                </div>
              </div>
              {index < pokemonEvolutions.length - 1 && (
                <div className=" ">
                  <IconRightChevron size="2em" />
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default EvolutionDetails;
