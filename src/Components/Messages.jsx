import { Link, useLocation, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import PFP from "../assets/profile.jpeg";
import { auth, db, collection, getDocs } from "../Firebase/firebase.config";
import {
  AiOutlineArrowLeft,
  AiOutlineBars,
  AiOutlineVideoCameraAdd,
  AiTwotonePhone,
} from "react-icons/ai";
import "../Style/Loading.css";
import { addDoc, onSnapshot, query, where } from "firebase/firestore";
import moment from "moment/moment";

function Messages() {
  const navigate = useNavigate();
  const [messages, setMessage] = useState([]);
  const [chatList, setChatList] = useState([]);
  const param = useLocation();
  let name_1  = param.state.name.slice(0,1).toUpperCase()
  let full  = name_1 + param.state.name.slice(1).toLowerCase()
  
  
  
  const [admin, setAdmin1] = useState("");

  useEffect(() => {
    document.querySelector("title").innerHTML = "𝗖𝗵𝗮𝘁𝘀𝗔𝗽𝗽 |  𝗖𝗵𝗮𝘁 𝗪𝗶𝘁𝗵" + " " + full
    getName();
    const q = query(
      collection(db, "Chat"),
      where(param.state.uid, "==", true),
      where(param.state.myUid, "==", true)
    );
    onSnapshot(q, (docSnap) => {
      const list = [];
      docSnap.forEach((item) => {
        list.push(item.data());
      });
      // const sortList = list.sort((a,b) => {a.createdAt - b.createdAt})
      setChatList(list);
    });
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

  const sendMsg = async () => {
   addDoc(collection(db, "Chat"), {  // if future have any kind of error so back to line and remove the await
      messages,
      [param.state.myUid]: true,
      [param.state.uid]: true,
      senderUid : param.state.myUid,
      createdAt : Date.now(),
    });
    setMessage("");
  };

  return (
    <>
      <div className="contanier bg-gray-200 w-screen h-screen overflow-hidden">
        <div className="chatSection overflow-hidden">
          <nav className="chatHead h-[10vh] w-screen flex px-5 justify-between gap-3 items-center bg-violet-600">
            <div className="left_sideItems flex gap-3 items-center">
              <div
                className="icon text-3xl w-max h-max rounded-full p-[7px] hover:bg-violet-400"
                onClick={() => {
                  navigate("/chats");
                }}
              >
                <AiOutlineArrowLeft />
              </div>
              <img src={PFP} alt="User DP" className="rounded-full w-[10vw] sm:w-[3vw]" />
              <div className="name">
                <p className="font-bold text-3xl capitalize">
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
          <div className="chatting h-[75vh] mb-1 ps-5 pe-2">
            {chatList.map((item , index) => (
              <div key={index} onClick={()=> navigate("/Chat" , {state : {...item , myUid}})} className={`flex ${item.senderUid != param.state.myUid ? "justify-start" : "justify-end"}`}>
                <div className="bg-indigo-50 border border-black shadow-md shadow-purple-400 rounded-md mt-3 h-max py-2 px-3 max-w-[50%] w-max">
                <h1 className="font-semibold text-[21px]">{item.messages}</h1>
                <h1 className="text-gray-700 text-[13px]">{moment(item.createdAt).startOf('seconds').fromNow()}</h1>
                </div>
              </div>
            ))

            }
          </div>
          <div className="Messages w-[98vw] mx-2 border-t-2 justify-center border-black h-[13vh] flex">
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

export default Messages;
