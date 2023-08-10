import { PokemonCard, Pokemon } from "./pokemonCard";

interface CardProps {
  pokemons: Pokemon[];
}
const PokemonCards: React.FC<CardProps> = ({ pokemons }) => {
  return (
    <div
      className={`grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
    >
      {pokemons.map((pokemon, i) => (
        <PokemonCard pokemon={pokemon} key={i} />
      ))}
    </div>
  );
};

export default PokemonCards;
