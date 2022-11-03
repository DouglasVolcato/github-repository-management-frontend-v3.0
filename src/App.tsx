import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AxiosInterceptor } from "./components/AxiosInterceptor";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ClientProvider } from "./context/context";
import { Login } from "./pages/Login";
import { NoteEdition } from "./pages/NoteEdition";
import { Notes } from "./pages/Notes";
import { Register } from "./pages/Register";
import { Repositories } from "./pages/Repositories";
import "./styles/App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClientProvider>
      <AxiosInterceptor>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/repositories" element={<Repositories />} />
            <Route path="/note-edition/:noteName" element={<NoteEdition />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AxiosInterceptor>
    </ClientProvider>
  </React.StrictMode>
);
