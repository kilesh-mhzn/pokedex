import { useState } from "react";
import RamroTabs from "../RamroTabs";
import { Pokemon } from "../pokemonCard";

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
  const [tabs, setTabs] = useState([
    { label: "About", content: aboutContent() },
    { label: "Base Stats", content: <div>Content for Tab 2</div> },
    { label: "Evolution", content: <div>Content for Tab 3</div> },
  ]);

  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleTabChange = (activeTab: number) => {
    setCurrentTab(activeTab);
  };
  return (
    <div
      className={`pokemon__detail bg-${pokemon.color.name}-400 shadow-${pokemon.color.name}-400/50 h-full 
      flex flex-col justify-between`}
    >
      <img
        className="absolute z-0 opacity-60 right-[-40px] bottom-[180px] w-1/3 "
        src="src\assets\icons\pokeball.svg"
      />
      <div className="flex flex-col items-center gap-4 p-6 pt-8">
        <div className="font-game text-white capitalize">{pokemon.name}</div>
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
      </div>
      <div className="relative bg-white-100 dark:bg-slate-600 rounded-3xl p-6">
        <img
          className="h-[150px] absolute top-[-130px] right-1/2 translate-x-1/2 "
          src={
            pokemon.sprites.other.dream_world.front_default ||
            pokemon.sprites.front_default
          }
          loading="lazy"
        />
        <RamroTabs tabs={tabs} onTabChange={handleTabChange} />
      </div>
    </div>
  );
};
