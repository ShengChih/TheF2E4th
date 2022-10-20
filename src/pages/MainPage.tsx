import React from "react";
import Header from "@components/Header";
import SearchBanner from "@components/SearchBanner";
import PopularCity from "@components/PopularCity";
import Footer from "@components/Footer";

function MainPage() {
  return (
    <>
      <Header />
      <SearchBanner />
      <PopularCity cities={[]}/>
      <div className="mx-auto flex outline-show">
        <section className="festival-card outline-show" />
        <section className="festival-card outline-show" />
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
