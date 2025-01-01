import React, { useState } from "react"; // Import React and useState for state management
import "./Navbar.css"; // Import the CSS file for styling
import logo_light from "../../assets/logo-black.png"; // Import light theme logo
import logo_dark from "../../assets/logo-white.png"; // Import dark theme logo
import toggle_dark from "../../assets/day.png"; // Import light mode toggle icon
import toggle_light from "../../assets/night.png"; // Import dark mode toggle icon
import search_icon_light from "../../assets/search-w.png"; // Import search icon for light theme
import search_icon_dark from "../../assets/search-b.png"; // Import search icon for dark theme
import { createClient } from "@supabase/supabase-js"; // Import Supabase client to interact with the database
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation between pages

// Initialize Supabase client
const supabase = createClient(
  "https://zupqzccspymmcpwndpbx.supabase.co", // Supabase project URL
  import.meta.env.VITE_PUBLIC_SUPA_API_KEY // Supabase API key from environment variables for security
);

const Navbar = ({ theme, setTheme }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term entered by the user
  const [filteredPlayers, setFilteredPlayers] = useState([]); // State to store filtered player search results
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to toggle between light and dark themes
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  // Fetch player data based on the search term
  const fetchPlayer = async () => {
    const trimmedSearchTerm = searchTerm.trim(); // Trim whitespace from the search term
    if (!trimmedSearchTerm) {
      alert("Please enter a player's name!"); // Show an alert if the search term is empty
      return;
    }

    const names = trimmedSearchTerm.split(" "); // Split the search term into first and last name (if present)
    const firstName = names[0]; // First name is the first word in the search term
    const lastName = names[1] || ""; // Last name is the second word or empty if not provided

    try {
      let query = supabase.from("player_data").select("*"); // Start a query to fetch all players from the database

      if (lastName) {
        // If both first and last names are provided, search for both
        query = query
          .ilike("first_name", `%${firstName}%`) // Case-insensitive search for first name
          .ilike("last_name", `%${lastName}%`); // Case-insensitive search for last name
      } else {
        // If only one name is provided, search for it in both first and last name fields
        query = query.or(
          `first_name.ilike.%${firstName}%,last_name.ilike.%${firstName}%`
        );
      }

      const { data, error } = await query; // Execute the query

      if (error) {
        console.error("Error fetching player:", error.message); // Log the error if one occurs
        return;
      }

      if (data.length === 0) {
        // If no players are found, show an alert and clear the results
        alert("No player found!");
        setFilteredPlayers([]);
        return;
      }

      setFilteredPlayers(data); // Update the state with the search results
    } catch (error) {
      console.error("Error fetching player:", error.message); // Log any errors
    }
  };

  // Navigate to the player's stats page when a player is clicked
  const handlePlayerClick = (playerId) => {
    console.log("Player ID:", playerId);
    const url = `/player-stats/${Number(playerId)}`;
    console.log("Navigating to URL:", url);
    navigate(url);
  };

  return (
    <div className="navbar">
      {/* Logo changes based on the current theme */}
      <img
        src={theme === "light" ? logo_light : logo_dark}
        alt="Logo"
        className="logo"
      />
      {/* Static navigation links */}
      <ul>
        <li>
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: theme === "light" ? "#0d0d0d" : "#ffffff", // Adjust these colors as needed
            }}
          >
            Home
          </a>
        </li>
        <li>
          <a
            style={{
              textDecoration: "none",
              color: theme === "light" ? "#0d0d0d" : "#ffffff", // Adjust these colors as needed
            }}
          >
            About
          </a>
        </li>
      </ul>

      {/* Search box for player search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search" // Placeholder text for the search box
          value={searchTerm} // Controlled input bound to searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update state when input value changes
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchPlayer(); // Fetch player data when the user presses Enter
            }
          }}
        />
        {/* Search icon changes based on theme and triggers fetchPlayer on click */}
        <img
          src={theme === "light" ? search_icon_light : search_icon_dark}
          alt="Search"
          onClick={fetchPlayer}
        />
      </div>

      {/* Theme toggle button changes the theme on click */}
      <img
        onClick={toggle_mode}
        src={theme === "light" ? toggle_light : toggle_dark}
        alt="Toggle Theme"
        className="toggle-icon"
      />

      {/* Conditionally render search results if there are any */}
      {filteredPlayers.length > 0 && (
        <div className="search-results">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="search-result-item"
              onClick={() => handlePlayerClick(player.id)}
            >
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

export default Navbar; // Export the Navbar component for use in other parts of the app
