import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Habits, AuthLayout,MainLayout, Login, Nutrition, Register, Task, Settings, KanbanTeam, KanbanPersonal, Finances} from "../pages";

const router = [{
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/task",
        element: <Task />,
      },
      {
        path: "/habits",
        element: <Habits />,
      },
      {
        path: "/kanbanPersonal",
        element: <KanbanPersonal />,
      },
      {
        path: "/kanbanTeam",
        element: <KanbanTeam />,
      },
      {
        path: "/nutrition",
        element: <Nutrition />,
      },
      // {
      //   path: "/finances",
      //   element: <Finances />,
      // },
      {
        path: "/settings",
        element: <Settings />,
      }
    ],
  }
];

const createRouter = createBrowserRouter(router);
export default createRouter

