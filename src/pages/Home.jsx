import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Jaylen from "../Components/Player/jaylen";
import Luka from "../Components/Player/luka";
import Eastern from "../Components/Standings/eastern";
import PlayerStats from "../Components/PlayerStats/PlayerStats.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => {
  // Get the current theme from localStorage, default to "light" if not set
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme || "light");

  // Store fetched player data and API error in states
  const [playerData, setPlayerData] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  // Sync theme changes with localStorage
  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  // Fetch NBA player data when the app first loads
  useEffect(() => {
    const fetchNBAPlayers = async () => {
      const url = "https://api.balldontlie.io/v1/players";
      const options = {
        method: "GET",
        headers: {
          Authorization: import.meta.env.VITE_PUBLIC_NBA_API_KEY,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch player data");
        }

        setPlayerData(result.data);
      } catch (error) {
        setFetchError(error.message);
        console.error("Error fetching NBA player data:", error);
      }
    };

    fetchNBAPlayers();
  }, []);

  return (
    <>
      <div className={`container ${theme}`}>
        {/* Navbar with theme control */}
        <Navbar theme={theme} setTheme={setTheme} />

        {/* Display any API fetch error */}
        {fetchError && (
          <div style={{ color: "red", textAlign: "center", marginTop: "1em" }}>
            <p>Error: {fetchError}</p>
          </div>
        )}

        {/* Static heading */}
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

        {/* Define routes for navigation */}
        <Routes>
          <Route path="/player-stats/:id" element={<PlayerStats />} />
        </Routes>

        {/* Static components */}
        <Jaylen />
        <Luka />
        <Eastern />
      </div>
    </>
  );
};

export default Home;
