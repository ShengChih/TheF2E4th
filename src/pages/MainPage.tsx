import React from "react";
import Header from "@components/Header";
import SearchBanner from "@components/SearchBanner";
import PopularCity from "@layouts/PopularCity";
import PopularFestival from "@layouts/PopularFestival";
import PopularFood from "@layouts/PopularFood";
import Footer from "@components/Footer";

function MainPage() {
  return (
    <>
      <Header />
      <SearchBanner />
      <div className="mx-auto flex flex-col outline-show">
        <PopularCity />
        <PopularFestival />
        <PopularFood />
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
