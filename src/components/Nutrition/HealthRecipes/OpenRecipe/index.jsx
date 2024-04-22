import imgOpenRecipe from "../../../../assets/images/example-recipe.jpg";
import curve from "../../../../assets/curve.svg";
import { IconX, IconCheck } from "@tabler/icons-react";
export default function OpenRecipe({ handleSetOpenRecipe }) {
  return (
    <div className="inset-0 fixed bg-black/30 z-20">
      <div className="fixed inset-0 w-screen p-6 flex items-center justify-center">
        <div className="h-[600px] md:size-[700px] m-5 rounded-xl flex justify-between overflow-hidden flex-col md:flex-row bg-[white]">
          <div className="flex flex-col justify-between h-full p-5">
            <div>
              <div className="flex justify-between mb-2 text-[14px] md:text-[16px]">
                <h2 id="open-recipe-type">DESAYUNO</h2>
                <span id="open-recipe-time">10min</span>
              </div>
              <h1 className="font-semibold text-xl mb-2 md:text-2xl">
                PANCAKES DE AVENA
              </h1>
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="mb-2 text-[14px] md:text-base">Ingredients</h3>
                  <ul className="text-[12px] ml-5 flex flex-col md:gap-1">
                    <li>5 cucharadas de Avena (50g)</li>
                    <li>1 huevo entero (55g)</li>
                    <li>1/2 cdta de aceite de oliva (3g)</li>
                    <li>1/4 tza de leche (60g)</li>
                    <li>1/2 cdta de aceite de oliva (3g)</li>
                    <li>Fruits (optional)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-[14px] md:text-base">
                    Instructions
                  </h3>
                  <div className="text-[12px] ml-5 flex flex-col h-[150px] md:h-[300px] overflow-auto md:gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[16px]">1</span>
                      <p>
                        Licuar la avena hasta pulverizarla o utilizar harina de
                        avena.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[16px]">2</span>
                      <p>
                        Mezclar todos los ingredientes y dejar reposar por 5
                        minutos. Opcional: puede agregar stevia o el edulcorante
                        de su agrado (xilitol, eritritol, fruto del monje, etc).
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[16px]">3</span>
                      <p>Calentar una sartén a fuego medio.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[16px]">4</span>
                      <p>
                        Verter un poco de la mezcla en la sartén y cocinar a
                        fuego mínimo.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[16px]">5</span>
                      <p>
                        Cuando salgan pequeñas burbujas, voltear, dejar por unos
                        segundos y retirar del fuego.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[16px]">6</span>
                      <p>
                        Repetir hasta preparar toda la mezcla, la cantidad
                        dependerá del tamaño y grosor que se le de a cada
                        panqueque.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[16px]">7</span>
                      <p>
                        Servir, se puede acompañar con mermelada o sirope sin
                        azúcar o un poco de fruta.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5 mt-5">
              <button 
              className="hover:scale-125 transition duration-500 border-2 border-black rounded-full p-1"
              onClick={handleSetOpenRecipe}>
                <IconCheck stroke={2} />
              </button>
              <button 
              className="hover:scale-125 transition duration-500 border-2 border-black rounded-full p-1"
              onClick={handleSetOpenRecipe}>
                <IconX stroke={2} />
              </button>
            </div>
          </div>
          <div className="relative md:w-[300px] flex-none">
            <div className="absolute hidden md:block">
              <img src={curve} alt="curve" className="" />
            </div>
            <img
              src={imgOpenRecipe}
              alt=""
              className="h-[700px] w-full md:w-[700px] object-cover rounded-full overflow-hidden relative max-w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
