import logo from "../../../../assets/logo.svg";

export const SidebarLogo = ({ collapsed, handleCollapsed }) => {
  return (
    <button
      className="w-full items-center justify-center flex px-4 active:scale-95"
      onClick={handleCollapsed}
    >
      {collapsed ? (
        <div className="w-full max-w-16 h-16 items-center justify-center flex">
          <img className="w-full object-cover" src={logo} alt="Logo Life Unity" />
        </div>
      ) : (
        <h2 className="font-primary text-3xl text-white  h-16 flex items-center">
          <span className="font-extrabold tracking-tighter">Life</span>
          <span className="tracking-tighter">Unity</span>
        </h2>
      )}
    </button>
  );
};
