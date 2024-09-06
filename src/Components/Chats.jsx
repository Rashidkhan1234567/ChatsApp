import { getDocs, collection, db } from "../Firebase/firebase.config";
import PFP from "../assets/profile.jpeg";
import "../Style/Loading.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


function UsersID() {
  const navigate = useNavigate();
  const [allUser, setUser] = useState([]);
  const [myUid, setMyUid] = useState("");
  const [con, setCon] = useState(false);
  
  useEffect(() => {
    document.querySelector("title").innerHTML = "𝗖𝗵𝗮𝘁𝘀𝗔𝗽𝗽 |  𝗖𝗵𝗮𝘁"
    getUser();
  }, []);

  const getUser = async () => {
    setCon(true);
    let uid = localStorage.getItem("UID")
    setMyUid(uid)
    const userList = [];
    const userdata = await getDocs(collection(db, "Users"));
    userdata.forEach((item) => {
      userList.push(item.data());
    });
    // if(userList.includes(uid))
    console.log(userList)
    setUser(userList);
    setCon(false);
  };

  return con ? (
    <div className="rap bg-gray-200 w-screen h-screen">
      <nav className="bg-white border-gray-200 w-screen absolute top-0 dark:bg-indigo-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white capitalize">
           <div className="loader1"></div>
        </span>
        
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="item1">
            <input type="text" className="px-3 text-white w-[17vw] mr-5 h-[6vh] my-1 rounded-md bg-slate-900 focus:border focus:outline-none " placeholder="Search..."/>
          </div>
          <div className="item2">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <img
              className="w-10 h-10 rounded-full border-[2px] border-black"
              src={PFP}
              alt="user photo"
            />
          </button>
            </div>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-indigo-900 md:dark:bg-indigo-900 dark:border-gray-700">
          <li>
              <Link
                to="/Home"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Chats"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Chats
              </Link>
            </li>
            <li>
              <Link
                to="/Location"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Location
              </Link>
            </li>
            <li>
              <Link
                to="/Marketplace"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Marketplace
              </Link>
            </li>
                  </ul>
        </div>
      </div>
    </nav>
    
    <div className="loader2"></div>
    </div>
  ) : (
    <div className="body w-screen h-screen overflow-x-hidden bg-gray-200">
    <Navbar />
    <div className="flex flex-col w-[95vw] mx-auto">
      {allUser.map((user) => (
        <div
          key={user.uid}
          className="user flex h-[15vh] items-center px-5 justify-between bg-violet-500 w-[95vw] mx-auto mt-7 rounded-lg hover:bg-violet-600"
        >
          <div className="side-1 flex items-center gap-5">
            <img src={PFP} alt="User DP" className="rounded-full w-[5vw]" />
            <div className="inner_side">
              <p className="name font-bold text-xl">{user.name}</p>
              <p className="email text-slate-700">{user.email}</p>
            </div>
          </div>
          <div className="side-2">
            <button
              type="button"
              onClick={() => navigate("/Messages", { state: {...user , myUid} })}
              className="btn cursor-pointer bg-slate-400 text-lg w-[max-content] px-5 h-[8vh] rounded-lg hover:text-black hover:bg-slate-500"
            >
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default UsersID;