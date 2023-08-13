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
interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}
interface OtherSprites {
  dream_world: Sprite;
}

interface PokemonType {
  type: {
    name: string;
  };
}
interface Ability {
  ability: {
    name: string;
  };
}
export interface IGeneration {
  lable: string;
  name: string;
}
export interface IPokemon {
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
  weight: number;
  abilities: Ability[];
  height: number;
  stats: Stat[];
  isInTeam: Boolean;
  evolution_chain_url: string;
}

interface PokemonContextInterface {
  pokemonData: IPokemon[];
  setPokemonData: Dispatch<SetStateAction<IPokemon[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  pokemonTeam: IPokemon[];
  setPokemonTeam: Dispatch<SetStateAction<IPokemon[]>>;
  addToTeam: (pokemon: IPokemon) => void;
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
  const [pokemonData, setPokemonData] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [pokemonTeam, setPokemonTeam] = useState<IPokemon[]>(() => {
    const savedPokemonTeam = localStorage.getItem("pokemonTeam");
    return savedPokemonTeam ? JSON.parse(savedPokemonTeam) : [];
  });

  const addToTeam = (pokemon: IPokemon) => {
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
