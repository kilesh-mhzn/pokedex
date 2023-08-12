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

  const [_, setCurrentTab] = useState<number>(0);

  const handleTabChange = (activeTab: number) => {
    setCurrentTab(activeTab);
  };
  return (
    <div
      className={`pokemon__detail bg-${pokemon.color.name}-400 shadow-${pokemon.color.name}-400/50 h-full 
      flex flex-col justify-between`}
    >
      <div className="relative flex flex-col items-center gap-4 p-6 pt-8">
        <span className="text-white-100 z-0 absolute left-6 top-3 text-2xl opacity-60 ">
          #{String(pokemon.order).padStart(3, "0")}
        </span>
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
        <div className="min-h-[150px]"></div>
      </div>
      <div className="pokemon_tabs relative bg-white-100 dark:bg-slate-600 rounded-3xl p-6">
        <img
          className="absolute z-0 opacity-60 right-[-40px] top-[-120px] w-1/3 "
          src="/pokeball.svg"
        />
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
