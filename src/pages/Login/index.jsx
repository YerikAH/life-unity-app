import logo from '../../assets/logo.svg'

export function Login() {
  return (
    <>
      <nav className="p-5 flex justify-between items-center md:my-5 md:px-10">
        <div className="logo flex items-center gap-3">
          <img src={logo} alt="Logo LifeUnity" className="size-[50px]" />
          <div className="text-xl md:text-[35px] font-thin">
            <span className="font-extrabold">Life</span>Unity
          </div>
        </div>
        <button
          type="button"
        >
          SignUp
        </button>
      </nav>
    </>
  )
}