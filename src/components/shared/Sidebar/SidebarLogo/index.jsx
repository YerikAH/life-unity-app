import logo from '../../../../assets/logo.svg'
export const SidebarLogo = ({ open, handleSidebar }) => {
  return (
    <>
      <button
        id="title"
        className={`md:w-full text-white text-3xl items-center justify-center md:h-[40px] hidden ${open ? "md:flex" : ""
          }`}
        onClick={handleSidebar}>
        <h2>
          <span className="font-bold">Life</span>Unity
        </h2>
      </button>
      <button
        className={`md:w-full items-center justify-center md:h-[40px] hidden ${open ? "" : "md:flex"
          }`}
        onClick={handleSidebar}>
        <img className="size-[60px]" src={logo} alt="Logo Life Unity" />
      </button>
    </>
  );
}
