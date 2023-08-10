import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define interfaces for better type checking and clarity
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
}

interface PokemonContextInterface {
  pokemonData: Pokemon[];
  setPokemonData: Dispatch<SetStateAction<Pokemon[]>>;
}

type PokemonProviderProps = {
  children: ReactNode;
};

const defaultState: PokemonContextInterface = {
  pokemonData: [],
  setPokemonData: () => {},
};

export const PokemonContext = createContext(defaultState);

export default function PokemonProvider({ children }: PokemonProviderProps) {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  return (
    <PokemonContext.Provider value={{ pokemonData, setPokemonData }}>
      {children}
    </PokemonContext.Provider>
  );
}
