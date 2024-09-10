import './App.css'
import * as React  from 'react'
import * as ReactDOM from "react-dom/client";
import Login from './Components/Login';
import Signup from './Components/Signup';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
// import Home from "./Components/Home"
import Loading from './Components/Loading';
import Error from './Components/Error';
import Messages from './Components/Messages';
import Chats from './Components/Chats.jsx';
import Location from './Components/Location.jsx';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Loading/>,
    },
    {
      path: "*",
      element: <Error/>,
    },
    // {
    //   path: "/Home",
    //   element: <Home/>,
    // },
    {
      path: "/Login",
      element: <Login/>,
    },
    {
      path: "/Signup",
      element: <Signup/>,
    },
    {
      path: "/Chats",
      element: <Chats/>,
    },
    {
      path: "/Messages",
      element: <Messages/>,
    },
    {
      path: "/Location",
      element: <Location/>,
    },
  ]);
  // const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
  )
}

export default App
