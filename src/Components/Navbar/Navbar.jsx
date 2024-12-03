import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo_light from "../../assets/logo-black.png";
import logo_dark from "../../assets/logo-white.png";
import toggle_dark from "../../assets/day.png";
import toggle_light from "../../assets/night.png";
import search_icon_light from "../../assets/search-w.png";
import search_icon_dark from "../../assets/search-b.png";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zupqzccspymmcpwndpbx.supabase.co",
  import.meta.env.VITE_PUBLIC_SUPA_API_KEY
);

const Navbar = ({ theme, setTheme, fetchPlayerStats }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [playerData, setPlayerData] = useState(null); // I put a null value because all collums have allow nullables also data isn't present before user search.
  const toggle_mode = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  const fetchPlayer = async () => {
    // Trim the search term to remove leading and trailing spaces
    const trimmedSearchTerm = searchTerm.trim();
    console.log("Trimmed search term:", trimmedSearchTerm);

    // If the search term is empty, do nothing and return early
    if (!trimmedSearchTerm) {
      console.log("No search term entered.");
      return;
    }

    // Split the search term into first and last names
    const names = trimmedSearchTerm.split(" ");
    const firstName = names[0]; // First name is the first part of the search term
    const lastName = names[1] || ""; // Last name is the second part; if not provided, it's an empty string

    try {
      // Create a query to search in the 'player_data' table
      let query = supabase.from("player_data").select("*");

      if (lastName) {
        // If both first and last names are provided, search both first_name and last_name
        query = query
          .ilike("first_name", `%${firstName}%`) // Search for first name in 'first_name' column
          .ilike("last_name", `%${lastName}%`); // Search for last name in 'last_name' column
      } else {
        // If only one name is entered, search that name in both first_name and last_name columns
        query = query.or(
          `first_name.ilike.%${firstName}%,last_name.ilike.%${firstName}%`
        );
      }

      // Execute the query to fetch data from the Supabase table
      const { data, error } = await query;

      // If there's an error in the query, log it and return
      if (error) {
        console.error("Error fetching player:", error.message);
        return;
      }

      // Log the fetched player data to the console
      console.log("Player data fetched:", data);

      // If no player data is returned, log a message saying no player was found
      if (data.length === 0) {
        console.log("No player found for the search term.");
      }

      // Update the state with the fetched player data
      setPlayerData(data);
    } catch (error) {
      // Log any unexpected errors that happen during the fetch process
      console.error("Error fetching player:", error.message);
    }
  };

  // Trigger the search when the button is clicked
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await fetchPlayer(); // Trigger the fetchPlayer function
    } else {
      alert("Please enter a player name!"); // Alert if the search term is empty
    }
  };

  //The onChange updates the state variable, basically telling react what you have typed and react see this and updates the serach bar to what you have typed

  return (
    <div className="navbar">
      <img
        src={theme == "light" ? logo_light : logo_dark}
        alt=""
        className="logo"
      />

      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={theme == "light" ? search_icon_light : search_icon_dark}
          alt=""
          onClick={fetchPlayer}
        />
      </div>

      <img
        onClick={() => {
          toggle_mode();
        }}
        src={theme == "light" ? toggle_light : toggle_dark}
        alt=""
        className="toggle-icon"
      />
    </div>
  );
};

export default Navbar;
