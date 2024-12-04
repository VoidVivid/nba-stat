import React, { useState } from "react";
import "./Navbar.css";
import logo_light from "../../assets/logo-black.png"; // Light theme logo
import logo_dark from "../../assets/logo-white.png"; // Dark theme logo
import toggle_dark from "../../assets/day.png"; // Light mode icon for theme toggle
import toggle_light from "../../assets/night.png"; // Dark mode icon for theme toggle
import search_icon_light from "../../assets/search-w.png"; // Light theme search icon
import search_icon_dark from "../../assets/search-b.png"; // Dark theme search icon
import { createClient } from "@supabase/supabase-js"; // Supabase client for data fetching

// Initialize Supabase client with your project URL and API key
const supabase = createClient(
  "https://zupqzccspymmcpwndpbx.supabase.co",
  import.meta.env.VITE_PUBLIC_SUPA_API_KEY
);

const Navbar = ({ theme, setTheme }) => {
  // State hooks to handle search term and filtered player results
  const [searchTerm, setSearchTerm] = useState(""); // Holds the current search term
  const [filteredPlayers, setFilteredPlayers] = useState([]); // Holds the list of filtered players

  // Function to toggle between light and dark themes
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  // Function to fetch player data based on search term
  const fetchPlayer = async () => {
    const trimmedSearchTerm = searchTerm.trim(); // Remove extra spaces from the search term
    if (!trimmedSearchTerm) {
      console.log("No search term entered."); // If no search term is entered, log it
      return;
    }

    // Split the search term into first and last name (if applicable)
    const names = trimmedSearchTerm.split(" ");
    const firstName = names[0];
    const lastName = names[1] || ""; // If there's no last name, assign an empty string

    try {
      // Construct the query to search the database for player data
      let query = supabase.from("player_data").select("*");

      // If there's a last name, search by first and last names
      if (lastName) {
        query = query
          .ilike("first_name", `%${firstName}%`) // Case-insensitive match for first name
          .ilike("last_name", `%${lastName}%`); // Case-insensitive match for last name
      } else {
        // If no last name, search by first name or last name
        query = query.or(
          `first_name.ilike.%${firstName}%,last_name.ilike.%${firstName}%`
        );
      }

      // Execute the query and get the result
      const { data, error } = await query;

      // Check for any errors during the query
      if (error) {
        console.error("Error fetching player:", error.message);
        return;
      }

      console.log("Fetched player data:", data); // Log fetched data for debugging

      if (data.length === 0) {
        console.log("No player found for the search term."); // Log if no player data is found
      }

      // Update the filteredPlayers state with the fetched player data
      setFilteredPlayers(data); // Set the filtered players list with the query results
    } catch (error) {
      // Catch and log any errors during the fetch process
      console.error("Error fetching player:", error.message);
    }
  };

  // Function to handle the search action (when user presses Enter or clicks the search icon)
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await fetchPlayer(); // Fetch players if the search term is not empty
    } else {
      alert("Please enter a player name!"); // Alert user if no search term is entered
    }
  };

  return (
    <div className="navbar">
      {/* Display the logo based on the theme */}
      <img
        src={theme === "light" ? logo_light : logo_dark}
        alt="Logo"
        className="logo"
      />
      {/* Navigation links */}
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>

      {/* Search bar and icon */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm} // Bind input value to searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state when user types
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchPlayer(); // Trigger search when Enter key is pressed
            }
          }}
        />
        <img
          src={theme === "light" ? search_icon_light : search_icon_dark} // Set search icon based on theme
          alt="Search"
          onClick={fetchPlayer} // Trigger fetchPlayer function when search icon is clicked
        />
      </div>

      {/* Toggle button to switch between light and dark themes */}
      <img
        onClick={() => toggle_mode()} // Call toggle_mode function when the theme toggle button is clicked
        src={theme === "light" ? toggle_light : toggle_dark} // Set theme toggle icon based on current theme
        alt="Toggle Theme"
        className="toggle-icon"
      />

      {/* Conditionally render search results if available */}
      {filteredPlayers.length > 0 && (
        <div className="search-results">
          {/* Map through the filtered players and display each player's name */}
          {filteredPlayers.map((player) => (
            <div key={player.id} className="search-result-item">
              <span>
                {player.first_name} {player.last_name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
