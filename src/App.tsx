import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Notes } from "./pages/Notes";
import { Register } from "./pages/Register";
import { Repositories } from "./pages/Repositories";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/repositories" element={<Repositories />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
