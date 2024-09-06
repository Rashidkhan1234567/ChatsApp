import { react } from "react";
import Navbar from "./Navbar";


function Home (){
  document.querySelector("title").innerHTML = "𝗖𝗵𝗮𝘁𝘀𝗔𝗽𝗽 | 𝗛𝗼𝗺𝗲"
    return (
        <div className="body w-screen h-screen ">
        <Navbar />
        </div>
    )
}

export default Home;