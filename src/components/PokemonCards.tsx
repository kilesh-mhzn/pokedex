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

interface Pokemon {
  order: number;
  name: string;
  image: string | undefined;
  types: pokemonType[];
  sprites: {
    other: OtherSprites;
  };
  color: {
    name: string;
  };
}
interface CardProps {
  pokemons: Pokemon[];
}
const PokemonCards: React.FC<CardProps> = ({ pokemons }) => {
  return (
    <div
      className={`grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      m-4 md:m-0`}
    >
      {pokemons.map((pokemon, i) => (
        <div
          className={`relative rounded-2xl p-10 pr-3 overflow-hidden shadow-lg 
          bg-${pokemon.color.name}-400 shadow-${pokemon.color.name}-400/50`}
          key={i}
        >
          <span className="text-white z-0 absolute right-6 top-3 text-2xl opacity-60 ">
            #{String(pokemon.order).padStart(3, "0")}
          </span>
          <img
            className="absolute z-0 opacity-60 right-[-20px] bottom-[-20px] w-1/2 "
            src="src\assets\icons\pokeball.svg"
          />
          <div className="flex justify-between gap-2 ">
            <div className="flex flex-col justify-around z-10">
              <div className="font-game text-white capitalize">
                {pokemon.name}
              </div>
              <div className="flex flex-col items-start gap-2">
                {pokemon.types.map(({ type }, i) => (
                  <div
                    key={i}
                    className="rounded-2xl px-4 py-1 bg-white-100 opacity-60 text-sm text-slate-800 capitalize"
                  >
                    {type.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="z-10">
              <img
                className="h-[150px]"
                src={pokemon.sprites.other.dream_world.front_default}
                alt=""
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonCards;
