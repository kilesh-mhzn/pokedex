import { useContext } from "react";
import { IPokemon, PokemonContext } from "../contexts/pokemonContext";

interface CardProps {
  pokemon: IPokemon;
  onClick?: () => void;
}
export const PokemonCard: React.FC<CardProps> = ({ pokemon, onClick }) => {
  const { addToTeam, removeFromTeam, pokemonTeam } = useContext(PokemonContext);
  const pokemonExistsInTeam = pokemonTeam.find(
    (teamPokemon) => teamPokemon.id === pokemon.id
  );

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl p-10 pr-3 overflow-hidden shadow-lg cursor-pointer
        bg-${pokemon.color.name}-400 shadow-${pokemon.color.name}-400/50`}
    >
      <span className="text-white-100 z-0 absolute right-6 top-3 text-2xl opacity-60 ">
        #{String(pokemon.order).padStart(3, "0")}
      </span>
      <img
        className="absolute z-0 opacity-60 right-[-20px] bottom-[-20px] w-1/2 "
        src="/pokeball.svg"
      />
      <div className="flex justify-between gap-2 ">
        <div className="flex flex-col justify-around z-10">
          <div className="font-game text-white-100 capitalize">
            {pokemon.name}
          </div>
          <div className="flex flex-col items-start gap-2">
            {pokemon.types.map(({ type }, i) => (
              <div
                key={i}
                className="rounded-2xl px-4 py-1 bg-white-100 opacity-60 font-semibold text-sm text-slate-800 capitalize"
              >
                {type.name}
              </div>
            ))}
          </div>
          <div>
            {pokemonExistsInTeam ? (
              <div
                title="Release Pokemon!"
                onClick={(event) => {
                  event.stopPropagation();
                  removeFromTeam(pokemon.id);
                }}
                className="absolute bottom-3 left-5 "
              >
                <img width={22} src="/logo.svg" alt="" />
              </div>
            ) : pokemonTeam.length >= 6 ? (
              <button
                disabled
                className="text-xs absolute bottom-3 left-3 bg-yellow-500 text-slate-50"
              >
                Team Full
              </button>
            ) : (
              <div
                title="Catch Pokemon!"
                onClick={(event) => {
                  event.stopPropagation();
                  addToTeam(pokemon);
                }}
                className="absolute bottom-2 left-4 "
              >
                <img width={30} src="/pokeball-outline.svg" alt="" />
              </div>
            )}
          </div>
        </div>
        <div className="z-10">
          <img
            className="h-[150px]"
            src={
              pokemon.sprites.other.dream_world.front_default ||
              pokemon.sprites.front_default
            }
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
