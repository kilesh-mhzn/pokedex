interface Sprite {
  front_default: string;
}

interface OtherSprites {
  dream_world: Sprite;
}

interface pokemonType {
  type: {
    name: string;
  };
}
interface Ability {
  ability: {
    name: string;
  };
}
interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface Pokemon {
  url: string;
  order: number;
  name: string;
  image: string | undefined;
  types: pokemonType[];
  sprites: {
    front_default: string;
    other: OtherSprites;
  };
  color: {
    name: string;
  };
  generation: any;
  weight: number;
  abilities: Ability[];
  height: number;
  stats: Stat[];
}

interface CardProps {
  pokemon: Pokemon;
  onClick: () => void;
}
export const PokemonCard: React.FC<CardProps> = ({ pokemon, onClick }) => {
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
