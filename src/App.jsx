import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PlayerStats from "./Components/PlayerStats/PlayerStats";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/player-stats/:id" element={<PlayerStats />}></Route>
      </Routes>
    </div>
  );
};

export default App;
