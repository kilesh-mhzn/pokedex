import { useContext, useState } from "react";
import RamroTabs from "../RamroTabs";
import { Pokemon } from "../pokemonCard";
import { PokemonContext } from "../../contexts/pokemonContext";
import RamroToast from "../RamroToast";

interface IProps {
  pokemon: Pokemon;
}
export const PokemonDetail = ({ pokemon }: IProps) => {
  const aboutContent = () => {
    return (
      <table className="capitalize">
        <tbody>
          <tr>
            <td>Species</td>
            <td className="flex gap-4 font-semibold ">
              {pokemon.types.map(({ type }) => type.name).join(", ")}
            </td>
          </tr>
          <tr>
            <td>Height</td>
            <td className="flex font-semibold">{pokemon.height}cm</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td className="flex font-semibold">{pokemon.weight / 10}kg</td>
          </tr>
          <tr>
            <td>Abilities</td>
            <td className="flex gap-4 font-semibold">
              {pokemon.abilities.map(({ ability }) => ability.name).join(", ")}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const baseStats = () => {
    return (
      <div>
        {pokemon.stats.map(({ stat, base_stat }, index) => {
          const barWidth = base_stat > 100 ? "100%" : `${base_stat}%`;

          return (
            <div key={index} className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div className="capitalize font-semibold">{stat.name}</div>
                <div className="text-gray-500">{base_stat}</div>
              </div>
              <div className="h-3 bg-gray-300 overflow-hidden rounded-full">
                <div
                  style={{ width: barWidth }}
                  className={`h-full  bg-blue-500 transition-all`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const [tabs] = useState([
    { label: "About", content: aboutContent() },
    { label: "Base Stats", content: baseStats() },
    { label: "Evolution", content: <div>Content for Tab 3</div> },
  ]);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("false");

  const handleShowToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };
  const { addToTeam, removeFromTeam, pokemonTeam } = useContext(PokemonContext);

  const [_, setCurrentTab] = useState<number>(0);

  const handleTabChange = (activeTab: number) => {
    setCurrentTab(activeTab);
  };

  const [pressing, setPressing] = useState(false);
  let timer: number | undefined;

  const pokemonExistsInTeam = pokemonTeam.find(
    (teamPokemon) => teamPokemon.id === pokemon.id
  );
  const handleMouseDown = () => {
    if (pokemonExistsInTeam) return;
    timer = setTimeout(() => {
      // Perform the action here
      addToTeam(pokemon);
      handleShowToast("Pokémon captured successfully!");
    }, 1500);
    setPressing(true);
  };

  const handleMouseUp = () => {
    clearTimeout(timer);
    if (pressing) {
      console.log("Action canceled");
    }
    setPressing(false);
  };

  const handlePokemonRelease = (event: React.MouseEvent) => {
    event.stopPropagation();
    removeFromTeam(pokemon.id);
    handleShowToast("Pokémon released successfully!");
  };

  return (
    <div
      className={`pokemon__detail relative bg-${pokemon.color.name}-400 shadow-${pokemon.color.name}-400/50 h-full 
      flex flex-col justify-between`}
    >
      <img
        className="absolute opacity-60 right-[-40px] top-[30%] md:top-[33%] w-1/3 "
        src="/pokeball.svg"
      />
      <div className="relative flex flex-col items-center gap-4 p-6 pt-8">
        <span className="text-white-100 z-0 absolute left-6 top-3 text-2xl opacity-60 ">
          #{String(pokemon.order).padStart(3, "0")}
        </span>
        <div className="font-game text-white-100 capitalize">
          {pokemon.name}
        </div>
        <div className="flex gap-3 justify-center">
          {pokemon.types.map(({ type }, i) => (
            <div
              key={i}
              className="rounded-2xl px-4 py-1 bg-white-100 opacity-60 font-semibold text-sm text-slate-800 capitalize"
            >
              {type.name}
            </div>
          ))}
        </div>
        {!pokemonExistsInTeam && (
          <div className="text-sm font-semibold text-white-100">
            Click and Hold the Pokémon to capture!!
          </div>
        )}
        <div className="min-h-[120px]"></div>
      </div>
      <div className="pokemon_tabs relative bg-white-100 dark:bg-slate-600 rounded-3xl p-6">
        <img
          className={`h-[150px] absolute top-[-130px] right-1/2 translate-x-1/2 ${
            !pokemonExistsInTeam ? "cursor-pointer" : ""
          }  `}
          src={
            pokemon.sprites.other.dream_world.front_default ||
            pokemon.sprites.front_default
          }
          loading="lazy"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
        {pokemonExistsInTeam && (
          <div
            title="Release Pokemon!"
            onClick={handlePokemonRelease}
            className="absolute top-[15px] right-[30px] cursor-pointer z-20 "
          >
            <img width={22} src="/logo.svg" alt="" />
          </div>
        )}

        <RamroTabs tabs={tabs} onTabChange={handleTabChange} />
      </div>
      {showToast && (
        <RamroToast message={toastMessage} onClose={handleCloseToast} />
      )}
    </div>
  );
};
