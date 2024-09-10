import { React, useState, useEffect } from "react";
import PFP from "../assets/profile.jpeg";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { auth, db, collection, getDocs } from "../Firebase/firebase.config";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import Logout from "./Logout";


const mapContainerStyle = {
  "margin-top" : "-38px",
  height: "570px",
  width: "100%",
};


function Location() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [admin, setAdmin1] = useState("");
  const [notOk, setNotOk] = useState(false);
  const [ok, setOk] = useState(false);
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
          setError(null);
          localStorage.setItem("access", true)
          setOk(true)
        },
        (err) => {
          if (err.code === 1) {
            setError(
              "Location permission denied. Please enable location permission in your browser settings."
            );
          } else {
            setError("Unable to retrieve location.");
          }
          setPosition(null);
          setNotOk(true)
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    document.querySelector("title").innerHTML = "𝗖𝗵𝗮𝘁𝘀𝗔𝗽𝗽 |  𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻";
    handleLocationClick()
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
    <div className="w-screen h-screen overflow-hidden">
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
             <Logout />
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
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
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
                  className="block py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Location
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
<div className="locate w-screen h-[90%] bg-slate-200 flex items-center justify-center flex-col gap-5">
{notOk ? (
          <div>
            <h1 className="text-3xl mb-10 font-semibold text-center">
              Get User Location
            </h1>
            {error && <p>{error}</p>}
          </div>
        ) : (
          ok ? (
            position && (
              <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={position}
                  zoom={20}
                >
                  <Marker position={position} />
                </GoogleMap>
              </LoadScript>
            )
          ) : (
            <div>
              <h1 className="text-3xl mb-10 font-semibold text-center">
                Get User Location
              </h1>
              
              {error && <p>{error}</p>}
            </div>
          )
        )}
    </div>
    </div>
  );
};

export default Location;
