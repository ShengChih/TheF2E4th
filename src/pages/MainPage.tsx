import React from "react";
import Header from "@components/Header";
import SearchBanner from "@components/SearchBanner";
import PopularCity from "@layouts/PopularCity";
import PopularFestival from "@layouts/PopularFestival";
import Footer from "@components/Footer";

function MainPage() {
  return (
    <>
      <Header />
      <SearchBanner />
      <div className="mx-auto flex flex-col outline-show">
        <PopularCity />
        <PopularFestival />
        <section className="festival-card outline-show" />
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
