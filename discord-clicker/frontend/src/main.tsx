import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Autht from "./pages/Autht";
import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/discord/oauth/authenticate/" element={<Autht />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/setup/guild">
        <Route path=":id" element={<Setup />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
