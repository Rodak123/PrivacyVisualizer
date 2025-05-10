import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

export const App = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/data/')) {
    return null;
  }

  return (
    <Routes>
      <Route path="/*" element={<HomePage />} />
    </Routes>
  )
}
