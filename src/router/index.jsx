import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Habits, Layout, Login, Nutrition, Register, Task, Settings } from "../pages";

const router = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
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
        path: "/nutrition",
        element: <Nutrition />,
      },
      {
        path: "/settings",
        element: <Settings />,
      }
    ],
  },
];

const createRouter = createBrowserRouter(router);
export default createRouter

