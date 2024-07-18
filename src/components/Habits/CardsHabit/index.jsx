import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import { CardHabit, ModalCreate, ModalRemove } from "../";
import { IconCoffee } from "@tabler/icons-react";
import { useState } from "react";


const habits = [

  {
    "id": "1",
    "name": "Leer antes de dormir",
    "time": "10:00pm",
    "duration": "30",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "2",
    "name": "Hacer ejercicio por la mañana",
    "time": "7:00am",
    "duration": "45",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "3",
    "name": "Meditar después del almuerzo",
    "time": "1:00pm",
    "duration": "20",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "4",
    "name": "Tomar un vaso de agua cada hora",
    "time": "Hora en punto",
    "duration": "20",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "5",
    "name": "Escuchar música mientras trabajas",
    "time": "Durante el día",
    "duration": "50",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "6",
    "name": "Hacer una caminata al aire libre",
    "time": "5:00pm",
    "duration": "1",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "7",
    "name": "Desayunar todos los días",
    "time": "8:00am",
    "duration": "20",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "8",
    "name": "Practicar un idioma extranjero",
    "time": "Después del trabajo",
    "duration": "30",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "9",
    "name": "Revisar correos electrónicos",
    "time": "9:00am",
    "duration": "15",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "10",
    "name": "Apagar dispositivos electrónicos antes de dormir",
    "time": "10:30pm",
    "duration": "5",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "11",
    "name": "Planificar el día siguiente antes de acostarse",
    "time": "10:30pm",
    "duration": "15",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "12",
    "name": "Comer una fruta como merienda",
    "time": "3:00pm",
    "duration": "5",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "13",
    "name": "Tomar un descanso cada hora de trabajo",
    "time": "Cada hora",
    "duration": "10",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "14",
    "name": "Hacer la cama por la mañana",
    "time": "Después de levantarse",
    "duration": "5",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "15",
    "name": "Realizar estiramientos antes de dormir",
    "time": "10:00pm",
    "duration": "10",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "16",
    "name": "Agradecer por algo cada noche",
    "time": "Antes de dormir",
    "duration": "5",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "17",
    "name": "Hacer una lista de tareas pendientes",
    "time": "Al empezar el día",
    "duration": "10",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "18",
    "name": "Llevar un diario de gratitud",
    "time": "Antes de dormir",
    "duration": "5",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "19",
    "name": "Revisar las metas semanales",
    "time": "Cada domingo",
    "duration": "15",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  },
  {
    "id": "20",
    "name": "Respirar profundamente durante momentos de estrés",
    "time": "En situaciones estresantes",
    "duration": "1",
    "icon": (props) => <IconCoffee {...props} />,
    "color": "#FFA500"
  }
]

export const CardsHabit = () => {
  const [openRemove, setOpenRemove] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [id, setId] = useState("");

  const openModalRemove = (id) => {
    setOpenRemove(true);
    setId(id);
  };
  const openModalCreate = () => {
    setOpenCreate(true);
  };
  return (
    <div className="mt-5 shadow-sm rounded-md border">

      <DragDropContext onDragEnd={(result) => console.log(result)}>
        <Droppable droppableId="habits">
          {(droppableProvided) => (
            <ul
              role="list"
              className=" grid rounded-md  bg-white overflow-hidden"
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {habits.map((habit, idx) => (
                <Draggable
                  key={habit.id}
                  draggableId={habit.id.toString()}
                  index={idx}
                >
                  {(draggableProvided) => (
                    <li
                    className="z-1"
                      key={habit.id}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <CardHabit id={habit.id} openModalEdit={openModalCreate} openModalRemove={openModalRemove} duration={habit.duration} name={habit.name} time={habit.time} key={habit.id} color={habit.color} icon={<habit.icon className="w-6 h-6 text-white" />} />
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <ModalRemove open={openRemove} setOpen={setOpenRemove} id={id} />
      <ModalCreate open={openCreate} setOpen={setOpenCreate} />
    </div>
  )
}
