import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Jaylen from "./Components/Player/jaylen";
import Luka from "./Components/Player/luka";
import Eastern from "./Components/Standings/eastern";
import { createClient } from "@supabase/supabase-js";

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
    const supabase = createClient(
      "https://zupqzccspymmcpwndpbx.supabase.co",
      import.meta.env.VITE_PUBLIC_SUPA_API_KEY
    );

    // This function handles fetching the next set of players
    const fetchNextPage = async (cursor) => {
      const url = `https://api.balldontlie.io/v1/players?per_page=100&cursor=${cursor}`;

      const options = {
        method: "GET",
        headers: {
          Authorization: import.meta.env.VITE_PUBLIC_NBA_API_KEY,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        // Upsert player data into Supabase table (assuming this part already works)
        const { error } = await supabase
          .from("player_data")
          .upsert(result.data, { onConflict: ["id"] });

        if (error) {
          console.error("Error upserting data: ", error);
        }

        // Check for next_cursor and continue fetching next pages if it exists
        if (result.meta && result.meta.next_cursor) {
          fetchNextPage(result.meta.next_cursor); // Recursively fetch the next page
        }
      } catch (error) {
        console.error("Error fetching next page of data: ", error);
      }
    };

    // Start fetching from the cursor of the last page you fetched (e.g., cursor = 100)
    const lastCursor = 100; // Change this to the actual cursor value from the previous API response
    fetchNextPage(lastCursor); // Call the function to start fetching the next page
  }, []); // Empty dependency array so it runs only once after initial render
  // empty dependency array

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
