import { useState } from "react";
import RamroModal from "./RamroModal";
import { PokemonCard, Pokemon } from "./pokemonCard";

interface CardProps {
  pokemons: Pokemon[];
}
const PokemonCards: React.FC<CardProps> = ({ pokemons }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const openModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };
  return (
    <div
      className={`grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
    >
      {pokemons.map((pokemon, i) => (
        <PokemonCard
          pokemon={pokemon}
          key={i}
          onClick={() => openModal(pokemon)}
        />
      ))}

      <RamroModal isOpen={isModalOpen} onClose={closeModal}>
        {selectedPokemon && (
          <>
            <h2 className="text-xl font-bold mb-2">
              Hello, I'm {selectedPokemon.name}!
            </h2>
            <p>This is some modal content.</p>
          </>
        )}
      </RamroModal>
    </div>
  );
};

export default PokemonCards;
