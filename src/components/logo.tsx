export const Logo = () => {
  return (
    <div>
      <div className="flex justify-center items-baseline tracking-wide text-6xl font-extrabold my-6">
        P
        <img
          className="mr-[0.025em]"
          width={36}
          src="public\logo.svg"
          alt="o"
        />
        <span className="underline underline-offset-8 decoration-red-400">
          kéd
        </span>
        ex
      </div>
    </div>
  );
};
