import React from "react";
import Header from "@components/Header";
import SearchBanner from "@components/SearchBanner";
import Footer from "@components/Footer";

function MainPage() {
  return (
    <>
      <Header />
      <SearchBanner />
      <div className="mx-auto flex outline-show">
        <section className="city-card outline-show" />
        <section className="festival-card outline-show" />
        <section className="festival-card outline-show" />
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
