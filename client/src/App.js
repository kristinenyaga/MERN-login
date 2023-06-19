import NotFound from './components/notfound';
import Password from './components/password';
import Profile from './components/profile';
import Recovery from './components/recovery';
import Register from './components/register';
import Reset from './components/reset';
import Username from './components/username';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthorizeUser } from './middleware/auth';
import { ProtectRoute } from './middleware/auth';
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
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
