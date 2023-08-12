import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface Sprite {
  front_default: string;
}

interface OtherSprites {
  dream_world: Sprite;
}

interface PokemonType {
  type: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  url: string;
  order: number;
  name: string;
  image: string | undefined;
  types: PokemonType[];
  sprites: {
    front_default: string;
    other: OtherSprites;
  };
  color: {
    name: string;
  };
  generation: string;
  weight: number;
  height: number;
  stats: any[];
  abilities: any[];
  isInTeam: Boolean;
}

interface PokemonContextInterface {
  pokemonData: Pokemon[];
  setPokemonData: Dispatch<SetStateAction<Pokemon[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  pokemonTeam: Pokemon[];
  setPokemonTeam: Dispatch<SetStateAction<Pokemon[]>>;
  addToTeam: (pokemon: Pokemon) => void;
  removeFromTeam: (id: number) => void;
}

type PokemonProviderProps = {
  children: ReactNode;
};

const defaultState: PokemonContextInterface = {
  pokemonData: [],
  setPokemonData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  pokemonTeam: [],
  setPokemonTeam: () => {},
  addToTeam: () => {},
  removeFromTeam: () => {},
};

export const PokemonContext = createContext(defaultState);

export default function PokemonProvider({ children }: PokemonProviderProps) {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [pokemonTeam, setPokemonTeam] = useState<Pokemon[]>(() => {
    const savedPokemonTeam = localStorage.getItem("pokemonTeam");
    return savedPokemonTeam ? JSON.parse(savedPokemonTeam) : [];
  });

  const addToTeam = (pokemon: Pokemon) => {
    const pokemonExists = pokemonTeam.find(
      (teamPokemon) => teamPokemon.id === pokemon.id
    );

    if (!pokemonExists && pokemonTeam.length < 6) {
      const updatedPokemon = { ...pokemon, isInTeam: true };
      setPokemonTeam((prevTeam) => [...prevTeam, updatedPokemon]);
    }
  };
  const removeFromTeam = (id: number) => {
    setPokemonTeam((prevTeam) =>
      prevTeam.filter((pokemon) => pokemon.id !== id)
    );
  };
  useEffect(() => {
    localStorage.setItem("pokemonTeam", JSON.stringify(pokemonTeam));
  }, [pokemonTeam]);
  return (
    <PokemonContext.Provider
      value={{
        pokemonData,
        setPokemonData,
        isLoading,
        setIsLoading,
        pokemonTeam,
        setPokemonTeam,
        addToTeam,
        removeFromTeam,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
