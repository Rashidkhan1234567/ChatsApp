import { Link, useLocation, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import PFP from "../assets/profile.jpeg";
// import UsersID from "./UsersID";
import { auth, db, collection, getDocs } from "../Firebase/firebase.config";
import {
  AiOutlineArrowLeft,
  AiOutlineBars,
  AiOutlineVideoCameraAdd,
  AiTwotonePhone,
} from "react-icons/ai";
import "../Style/Loading.css";
import { addDoc } from "firebase/firestore";
// import { getDocs, collection, db } from "../Firebase/firebase.config";

function Chat() {
  const navigate = useNavigate();
  const [messages, setMessage] = useState([]);
  const [chatList, setChatList] = useState([]);
  const param = useLocation();
  const [admin, setAdmin1] = useState("");
  console.log(param);

  useEffect(() => {
    getName();
  }, []);

  async function getName() {
    const data = await getDocs(collection(db, "Users"));
    const Admin = auth.currentUser;
    data.forEach((item) => {
      if (item.data().uid == Admin.uid) {
        setAdmin1(item.data().name);
      }
    });
  }
console.log(param.state.myUid);


  const sendMsg = () => {
    addDoc(collection(db, "Chat"), {
      messages,
      [param.state.myUid]: true,
      [param.state.uid]: true,
    });
    setMessage("");
  };

  return (
    <>
      <div className="contanier bg-gray-200 w-screen h-screen overflow-hidden">
        <nav className="bg-white border-gray-200 dark:bg-indigo-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white capitalize">
              {admin == "" ? <div className="loader1"></div> : <p>{admin}</p>}
            </span>

            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Status
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Calls
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="chatSection overflow-hidden">
          <nav className="chatHead h-[10vh] w-screen flex px-5 justify-between items-center bg-violet-600">
            <div className="left_sideItems flex">
              <div
                className="icon text-3xl w-max h-max rounded-full p-[7px] hover:bg-violet-400"
                onClick={() => {
                  navigate("/Home");
                }}
              >
                <AiOutlineArrowLeft />
              </div>
              <div className="name">
                <p className="font-bold text-3xl capitalize pl-4 pt-1">
                  {param.state.name}
                </p>
              </div>
            </div>
            <div className="right_sideItems flex gap-3">
              <div className="phoneIcon rotate-90 text-3xl w-max h-max p-[7px] rounded-full  hover:bg-violet-400">
                <AiTwotonePhone />
              </div>
              <div className="videoCallIcon text-3xl w-max h-max p-[7px] rounded-full  hover:bg-violet-400">
                <AiOutlineVideoCameraAdd />
              </div>
              <div className="barIcon text-3xl w-max h-max p-[7px] rounded-full  hover:bg-violet-400">
                <AiOutlineBars />
              </div>
            </div>
          </nav>
          <div className="chatting w-screen h-[65vh]"></div>
          <div className="Messages w-[98vw] ms-2 border-t-2 border-black h-[13vh] flex">
            <input
              type="text"
              autoFocus
              placeholder="Message"
              className="bg-slate-400 px-5 text-lg rounded-l-xl mt-3 w-[70vw] h-[70%] outline-none ms-4"
              value={messages}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  sendMsg();
                }
              }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="button"
              className="w-[20vw] h-[70%] bg-indigo-500 mt-3 rounded-r-lg hover:bg-indigo-600 text-2xl font-bold"
              onClick={sendMsg}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
