import s from "./index.module.css";

export const SidebarDrop = ({ drop, activeLink, handleActiveLink }) => {
  return (
    <>
      {drop ? (
        <div className="flex flex-col bg-white text-[#000428] rounded-tl-[20px] rounded-bl-[20px]">
          <div className="relative ps-3">
            <a
              id="personal"
              href="#"
              className={`${s.link} ${activeLink === "personal" ? s["drop-link-active"] : ""}`}
              onClick={(e) => {
                handleActiveLink(e);
                handleActiveLink("personal");
              }}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
              </div>
              Personal
            </a>
          </div>
          <div className="relative ps-3">
            <a
              id="teamWork"
              href="#"
              className={`${s.link} ${activeLink === "personal" ? s["drop-link-active"] : ""}`}
              onClick={(e) => {
                handleActiveLink(e);
                handleActiveLink("teamWork");
              }}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
              </div>
              Team Work
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
