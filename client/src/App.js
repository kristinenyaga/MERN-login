import NotFound from './components/notfound';
import Password from './components/password';
import Profile from './components/profile';
import Recovery from './components/recovery';
import Register from './components/register';
import Reset from './components/reset';
import Username from './components/username';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "*",
    element:<NotFound />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
