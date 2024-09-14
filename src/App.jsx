import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Jaylen from "./Components/Player/jaylen";
import Luka from "./Components/Player/luka";
import Eastern from "./Components/Standings/eastern";

const App = () => {
  const current_theme = localStorage.getItem("current_theme"); // localStorage saves data to the browser's localStorage database
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  // useState: It allows you to store data (like a variable) but when you change the state it changes also in the browser everywhere in real time
  const [data, setData] = useState([]); // Init to empty array because initially we won't have data

  // This code runs: 1.) When the page is first loaded, 2.) Anytime the value inside the dependency changes, it will run
  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]); // Anything in [] is called the dependency of the useEffect

  // I only want this to run 1 time, when the page is first loaded, so I keep the dependency array empty
  useEffect(() => {
    // Call the API

    // This is async, meaning it will not run on the main thread. Calling the API takes some time so its going to run kind of like in the background
    const fetchData = async () => {
      const id = 1200; // this is the ID of the player we want
      const url = "https://api.balldontlie.io/v1/players/" + id; // URL we're fetching from the API
      const options = {
        method: "GET", // GET = reading, POST = adding data (a database), PUT = updating data (a database), DELETE = removing data (a databaes)
        headers: {
          // headers are like options or variables we can pass in
          "Authorization": import.meta.env.VITE_API_KEY
        },
      };

      try {
        const response = await fetch(url, options); // javascript's default function for fetching APIs
        const result = await response.text(); // convert the API response into text
        console.log(result); // output it to the browser's console
      } catch (error) {
        // if we have an error when executing the thing in the try block, we go here
        console.error(error); // outputs the error to the brwoser console
      }
    };

    fetchData();
  }, []); // empty dependency array

  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <h2
        style={{
          color: "gray",
          marginLeft: "5.5em",
          marginTop: 30,
          textDecoration: "underline",
        }}
      >
        TOP PLAYERS
      </h2>
      <Jaylen className="section" />
      <Luka />
      <Eastern />
    </div>
  );
};

export default App;
