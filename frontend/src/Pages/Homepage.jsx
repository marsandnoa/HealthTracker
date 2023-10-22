import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import mountains from "../Homepage Components/mountains.mp4";
import runngingMan from "../Homepage Components/runningMan.png";
import sandwhich from "../Homepage Components/sandwhich.png";
import heart from "../Homepage Components/heart.png";
import "../Homepage Components/Homepage.css";

const Homepage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.controls = false;
  }, []);

  const [selected, setSelected] = useState(null);

  const toggleInfo = (item) => {
    if (selected === item) {
      setSelected(null);
    } else {
      setSelected(item);
    }
  };

  return (
    <div className="bg-teal-200 min-h-screen">
      <div className="relative flex flex-col">
        <div className="relative w-full h-0 py-52 overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            ref={videoRef}
            src={mountains}
            controls
            autoPlay
            loop
            muted
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute w-full h-full gradient-overlay z-10"></div>
          <div className="absolute bottom-0 left-0 p-4 z-20">
            <h1 className="text-5xl font-black text-teal-500">
              Welcome To HealthTrack
            </h1>
            <span> </span>
            <p className="text-3xl text-center text-white">
              A Web App for tracking personal health and exercise
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-center text-2xl font-bold p-8">
        App Details
      </h1>
      <p className="text-center text-xl text-cream p-5">
      This app is an exercise for Noah to practice React and Django
      </p>

      <div className="flex justify-center items-center">
        <ul className="flex text-cream font-bold mx-auto">
          <div
            className={`flex flex-col items-center mx-4 px-4 cursor-pointer clickable-div ${
              selected === "Image One" ? "expanded" : ""
            }`}
            onClick={() => toggleInfo("Image One")}
          >
            <img className="w-28 h-28" src={runngingMan} alt="largeFish" />
            <li>
              Exercise
              {selected === "Image One" && (
                <div className="info-container text-gray-500">
                  Track exercise, reps, and add notes
                </div>
              )}
            </li>
          </div>
          <div
            className="flex flex-col items-center mx-4 px-4 cursor-pointer clickable-div"
            onClick={() => toggleInfo("Image Two")}
          >
            <img className="w-28 h-28" src={sandwhich} alt="moneyBundle" />
            <li>
              Calories
              {selected === "Image Two" && (
                <div className="info-container text-gray-500">
                Track Calories by day
                </div>
              )}
            </li>
          </div>
          <div
            className="flex flex-col items-center mx-4 px-4 cursor-pointer clickable-div"
            onClick={() => toggleInfo("Image Three")}
          >
            <img className="w-28 h-28" src={heart} alt="moneyBundle" />
            <li>
              Health Notes
              {selected === "Image Three" && (
                <div className="text-gray-500 info-container">
                Keep Notes from day to day
                </div>
              )}
            </li>
          </div>
        </ul>
      </div>
      <div className="text-center py-10">
        <Link
          to="/Login"
          className="inline-block w-48 text-cream bg-teal-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 p-8"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
