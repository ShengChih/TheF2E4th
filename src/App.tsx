import React from "react";
import Header from "@components/Header";
import SearchBanner from "@components/SearchBanner";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBanner />
      <section className="city-card" />
      <section className="festival-card" />
      <section className="festival-card" />
      <footer />
    </div>
  );
}

export default App;
