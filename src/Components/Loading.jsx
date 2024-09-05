import { react, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Loading.css";

function Loading() {

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
    <div className="cover">
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
