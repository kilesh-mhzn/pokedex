interface Pokemon {
  id: number;
  name: string;
  image: string | undefined;
  pokemonType: string[];
}
interface CardProps {
  pokemons: Pokemon[];
}
const PokemonCards: React.FC<CardProps> = ({ pokemons }) => {
  return (
    <div
      className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
      m-4 md:m-0`}
    >
      {pokemons.map((pokemon, i) => (
        <div
          className="relative rounded-2xl p-10 pr-3 bg-green-400 overflow-hidden "
          key={i}
        >
          <span className="text-white z-0 absolute right-6 top-3 text-2xl opacity-60 ">
            #004
          </span>
          <img
            className="absolute z-0 opacity-60 right-[-20px] bottom-[-20px] w-1/2 "
            src="src\assets\icons\pokeball.svg"
          />
          <div className="flex justify-between gap-2 ">
            <div className="flex flex-col justify-around z-10">
              <div className="font-game text-white">{pokemon.name}</div>
              <div className="flex flex-col items-start gap-2">
                {pokemon.pokemonType.map((type, i) => (
                  <div
                    key={i}
                    className="rounded-2xl px-4 py-1 bg-white opacity-60 text-sm text-slate-800"
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
            <div className="z-10">
              <img className="h-[150px]" src={pokemon.image} alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonCards;
