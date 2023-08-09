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
      className={`grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
    >
      {pokemons.map((pokemon, i) => (
        <div
          className="relative rounded-2xl p-4 bg-green-400 flex justify-between gap-2"
          key={i}
        >
          <div className="flex flex-col justify-around">
            <div className="font-game">{pokemon.name}</div>
            <div className="flex flex-col items-start gap-2">
              {pokemon.pokemonType.map((type) => (
                <div className="rounded-2xl px-4 py-1 bg-white opacity-60 text-sm ">
                  {type}
                </div>
              ))}
            </div>
          </div>
          <div>
            <img className="h-[150px]" src={pokemon.image} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonCards;
