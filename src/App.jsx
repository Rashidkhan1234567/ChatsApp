import './App.css'
import * as React  from 'react'
import * as ReactDOM from "react-dom/client";
import Login from './Components/Login';
import Signup from './Components/Signup';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Home from "./Components/Home"
import Loading from './Components/Loading';
import Chat from './Components/Chats';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Loading/>,
    },
    {
      path: "/Home",
      element: <Home/>,
    },
    {
      path: "/Login",
      element: <Login/>,
    },
    {
      path: "/Signup",
      element: <Signup/>,
    },
    {
      path: "/Chat",
      element: <Chat/>,
    },
  ]);
  // const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
  )
}

export default App
