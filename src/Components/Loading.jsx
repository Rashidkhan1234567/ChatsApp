import { react, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Loading.css";

function Loading() {
  document.querySelector("title").innerHTML = "𝗖𝗵𝗮𝘁𝘀𝗔𝗽𝗽 |  𝗟𝗼𝗮𝗱𝗶𝗻𝗴"
    const navigate = useNavigate();
    const local = localStorage.getItem("UID")

    useEffect(()=>{

        if(local === null){
            navigate("/Login")
        }else{
          navigate("/Home")
        }
    })


  return (
    <div className="cover bg-gray-200">
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
