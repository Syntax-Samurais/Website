const NavBar = () => {
  return (
    <>
      <div className="flex mt-6 mx-auto w-3/4 h-12">
        <div className="w-[70px] h-[70px] inset-x-0 -my-3 m-auto absolute rounded-full bg-neutral-300 drop-shadow-lg z-10"></div>
        <div className="flex m-auto relative w-full h-full rounded-full bg-neutral-300">
          <div className="flex justify-around content-center px-12 w-1/2 text-sm items-center">
            <div className="flex justify-center h-full w-40 rounded-3xl bg-slate-500 items-center font-bold text-white drop-shadow-lg">
              <span>Dashboard</span>
            </div>
            <span>My Goals</span>
          </div>
          <div className="flex justify-around content-center px-12 w-1/2 text-sm items-center">
            <span className="leading-none">My Diet</span>
            <span>My Cardio</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
