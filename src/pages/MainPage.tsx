import React, { useEffect } from "react";
import { AxiosResponse } from 'axios'

import TDXApi from '@api/TDXApi'
import Header from "@components/Header";
import SearchBanner from "@components/SearchBanner";
import PopularCity from "@layouts/PopularCity";
import PopularFestival from "@layouts/PopularFestival";
import PopularFood from "@layouts/PopularFood";
import Footer from "@components/Footer";

const api = TDXApi.getInstance()
function MainPage() {
  useEffect(() => {
    // for testing
    const accessToken = localStorage.getItem('access_token') 
    const isLogged = !!accessToken
    if (!isLogged) {
      api.auth().then(({ data }: AxiosResponse) => {
        api.setAccessToken(data.access_token)
        localStorage.setItem('access_token', data.access_token)
      })
    } else {
      api.setAccessToken(accessToken)
    }
  }, [])

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
