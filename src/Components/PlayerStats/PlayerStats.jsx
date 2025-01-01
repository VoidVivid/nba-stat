import { useParams } from "react-router-dom"; // Import useParams to access dynamic route parameters
import { useEffect, useState } from "react"; // Import React hooks: useEffect for side effects and useState for state management
import { createClient } from "@supabase/supabase-js"; // Import Supabase client to interact with the database
import Navbar from "../Navbar/Navbar";

// Create a Supabase client instance using the Supabase URL and API key
const supabase = createClient(
  "https://zupqzccspymmcpwndpbx.supabase.co", // Supabase project URL
  import.meta.env.VITE_PUBLIC_SUPA_API_KEY // Supabase API key stored in environment variables for security
);

function PlayerStats() {
  const { id } = useParams(); // Extract the 'id' parameter from the route using useParams
  console.log("Recieved Player ID in PlayerStats:", id);
  const numericId = parseInt(id, 10); // Convert the 'id' to an integer (base 10) to ensure it's a valid number
  const [player_data, setPlayer_data] = useState(null); // State to hold the fetched player data
  const [error, setError] = useState(null); // State to hold any errors encountered during fetching

  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme || "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  // useEffect is used to fetch player data when the component mounts or when numericId changes
  useEffect(() => {
    const fetchPlayer = async () => {
      // Check if the ID is valid (not NaN) before making a request
      if (isNaN(numericId)) {
        setError("Invalid player ID"); // Set an error if the ID is invalid
        return; // Exit the function
      }

      try {
        // Query the Supabase database for the player data using the player's ID
        const { data, error } = await supabase
          .from("player_data") // Specify the table name (replace with your actual table name)
          .select("*") // Select all columns from the table
          .eq("id", numericId) // Filter rows where the 'id' matches numericId
          .single(); // Ensure that only a single result is returned

        if (error) throw error; // Throw an error if one is returned from Supabase
        setPlayer_data(data); // Update state with the fetched player data
      } catch (err) {
        setError(err.message); // Update state with the error message
        console.error("Error fetching player:", err); // Log the error for debugging
      }
    };

    fetchPlayer(); // Call the fetchPlayer function to retrieve data
  }, [numericId]); // Dependency array: re-run the effect if numericId changes

  // If an error occurs, display the error message
  if (error) return <p>Error: {error}</p>;
  // If data is still being loaded, display a loading message
  if (!player_data) return <p>Loading...</p>;

  // Render the player's data once it's loaded
  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <h1>
        {player_data.first_name} {player_data.last_name}{" "}
        {/* Display the player's full name */}
      </h1>
      <p>Position: {player_data.position}</p>{" "}
      {/* Display the player's position */}
      <p>{JSON.stringify(player_data.team)}</p>{" "}
      {/* Display the team object as a string for debugging */}
      <p>Height: {player_data.height}"</p> {/* Display the player's height */}
      <p>Weight: {player_data.weight} lbs</p>{" "}
      {/* Display the player's weight */}
    </div>
  );
}

export default PlayerStats; // Export the PlayerStats component so it can be used elsewhere
