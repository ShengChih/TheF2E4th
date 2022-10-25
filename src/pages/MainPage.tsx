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
      <PopularCity cities={[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
      ].map((n: number) => ({ name: n.toString() }))} />
      <div className="mx-auto flex outline-show">
        <section className="festival-card outline-show" />
        <section className="festival-card outline-show" />
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
