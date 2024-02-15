import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./page/HomePage";
import CountryName from "./page/CountryName";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/name/:name" element={<CountryName />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
