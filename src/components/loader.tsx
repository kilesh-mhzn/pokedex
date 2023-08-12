const Loader = () => {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 flex items-center justify-center">
      <div className="bg-slate-800 opacity-60 absolute inset-0 z-[11]"></div>
      <img
        src="\pokeball.svg"
        className="fill-slate-300 w-28 mx-auto animate-spin relative z-[12]"
      />
    </div>
  );
};

export default Loader;
