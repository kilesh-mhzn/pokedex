import { useContext } from "react";
import { PokemonCard } from "../pokemonCard";
import { PokemonContext } from "../../contexts/pokemonContext";

export const PokemonTeams = () => {
  const { pokemonTeam } = useContext(PokemonContext);
  if (!pokemonTeam.length)
    return (
      <div className="h-screen flex flex-col justify-center items-center w-[352px]">
        <img width={200} className="" src="/pokeball.svg" />
        Nothing Captured Yet
      </div>
    );
  return (
    <>
      <div className="text-4xl font-bold text-center m-6">The Team</div>
      <div className="h-[calc(100vh-90px)] overflow-auto">
        <div className="grid gap-6 m-6 ">
          {pokemonTeam.map((pokemon, i) => (
            <PokemonCard pokemon={pokemon} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};
