import PokemonListing from "./page/pokemonListing";
import PokemonProvider from "./contexts/pokemonContext";

function App() {
  return (
    <>
      <div className="background-container"></div>
      <PokemonProvider>
        <PokemonListing />
      </PokemonProvider>
    </>
  );
}

export default App;
