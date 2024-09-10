import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import PFP from "../assets/profile.jpeg";
import { auth, collection, db, getDocs } from "../Firebase/firebase.config";
import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";


function Marketplace() {

    const [admin, setAdmin1] = useState("");


    const images = [
        'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Slide+1',
        'https://via.placeholder.com/600x400/33FF57/FFFFFF?text=Slide+2',
        'https://via.placeholder.com/600x400/3357FF/FFFFFF?text=Slide+3',
      ];

    useEffect(() => {
        document.querySelector("title").innerHTML = "𝗖𝗵𝗮𝘁𝘀𝗔𝗽𝗽 |  𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻";
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
  
  

  return (
    <div className="min-h-screen w-screen">
      <nav className="bg-white border-gray-200 dark:bg-indigo-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white capitalize">
            {admin == "" ? <div className="loader1"></div> : <p className="w-40 text-4xl">{admin}</p>}
          </span>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="item1">
              <input
                type="text"
                className="px-3 text-white w-[17vw] mr-5 h-[6vh] my-1 rounded-md bg-slate-900 focus:border focus:outline-none "
                placeholder="Search..."
              />
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
            <div className="item3">
              <button
                type="button"
                title="Logout"
                className="ms-3 text-4xl p-1 hover:bg-indigo-200 rounded-full active:bg-slate-400"
              >
                <AiOutlineLogout />
              </button>
            </div>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-indigo-900 md:dark:bg-indigo-900 dark:border-gray-700">
              {/* <li>
                <Link
                  to="/Home"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </Link>
              </li> */}
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
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  to="/Marketplace"
                >
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

<section>
      <ImageSlider images={images} />    
</section>

    </div>
  );
}

export default Marketplace;
