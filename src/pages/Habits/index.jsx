import { IconFlame, IconInfoCircle, IconTargetArrow } from "@tabler/icons-react";
import { Calendar, CardsHabit, FilterHabit } from "../../components/Habits";
import { useTitle } from '../../hooks'
export function Habits() {
  useTitle("Habits - LifeUnity")
  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[auto_400px] gap-10 mt-8">
      <div>
        <FilterHabit />
        <CardsHabit />
      </div>
      <div className="border shadow-sm rounded-md p-5">

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-start gap-2 rounded-md border shadow py-4 px-4 w-full">
            <IconFlame className="w-8 h-8" />
            <div className="grid">
              <h2 className="text-[0.7rem] font-bold text-gray-900 font-primary tracking-widest">RACHA ACTUAL</h2>
              <p className="text-base text-gray-500 font-primary">14 días</p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2 rounded-md border shadow py-4 px-4 w-full">
            <IconTargetArrow className="w-8 h-8" />
            <div className="grid">
              <h2 className="text-[0.7rem] font-bold text-gray-900 font-primary tracking-widest">RACHA ACTUAL</h2>
              <p className="text-base text-gray-500 font-primary">14 días</p>
            </div>
          </div>
        </div>

        <Calendar />

        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-900 font-primary">Information</h2>
            <IconInfoCircle className="w-6 h-6 text-gray-900" />
          </div>
          <div className="grid gap-2 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-primary font-semibold text-gray-500">
                Name of habit
              </span>
              <span className="text-sm font-primary text-gray-500">
                Hacer ejercicio
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-primary font-semibold text-gray-500">
                Duración
              </span>
              <span className="text-sm font-primary text-gray-500">
                20 minuts
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-primary font-semibold text-gray-500">
                Fecha de creación
              </span>
              <span className="text-sm font-primary text-gray-500">
                15-04-2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}