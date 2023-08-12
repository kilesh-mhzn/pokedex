import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
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
}

interface PokemonContextInterface {
  pokemonData: Pokemon[];
  setPokemonData: Dispatch<SetStateAction<Pokemon[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

type PokemonProviderProps = {
  children: ReactNode;
};

const defaultState: PokemonContextInterface = {
  pokemonData: [],
  setPokemonData: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

export const PokemonContext = createContext(defaultState);

export default function PokemonProvider({ children }: PokemonProviderProps) {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <PokemonContext.Provider
      value={{ pokemonData, setPokemonData, isLoading, setIsLoading }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
