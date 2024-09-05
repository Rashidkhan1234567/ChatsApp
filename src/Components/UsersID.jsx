import { getDocs, collection, db } from "../Firebase/firebase.config";
import PFP from "../assets/profile.jpeg";
import "../Style/Loading.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UsersID() {
  const navigate = useNavigate();
  const [allUser, setUser] = useState([]);
  const [myUid, setMyUid] = useState("");
  const [con, setCon] = useState(false);

  useEffect(() => {
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
    console.log(userList);
    setUser(userList);
    setCon(false);
  };

  return con ? (
    <div className="rap">
    <div className="loader2"></div>
    </div>
  ) : (
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
              onClick={() => navigate("/Chat", { state: {...user , myUid} })}
              className="btn cursor-pointer bg-slate-400 text-lg w-[max-content] px-5 h-[8vh] rounded-lg hover:text-black hover:bg-slate-500"
            >
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersID;