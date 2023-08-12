const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[998]">
      <div className="bg-slate-800 opacity-60 absolute inset-0 z-[999]"></div>
      <img
        src="\pokeball.svg"
        className="fill-slate-300 w-28 mx-auto animate-spin relative z-[1000]"
      />
    </div>
  );
};

export default Loader;
