import React from "react";
import Header from "@components/Header";
import SearchBanner from "@components/SearchBanner";
import PopularCity from "@layouts/PopularCity";
import Footer from "@components/Footer";

function MainPage() {
  return (
    <>
      <Header />
      <SearchBanner />
      <div className="mx-auto flex bg-[#E5E5E5] outline-show">
        <PopularCity />
        <section className="festival-card outline-show" />
        <section className="festival-card outline-show" />
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
