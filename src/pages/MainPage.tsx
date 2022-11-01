import React, { useEffect } from "react"
import MainBannerContainer from "@components/MainBannerContainer";
import MainBanner from "@components/MainBanner";
import Header from '@components/Header'


function MainPage() {
  return (
    <>
      <MainBannerContainer>
        <Header />
        <MainBanner className={`mx-auto mt-[39px]`} />
      </MainBannerContainer>
    </>
  );
}

export default MainPage;
