import React, { useState } from "react";

import Selection from "@components/Selection";
import SearchBgImage from "./images/search_bg_img_1.svg";
import SearchLandingTextImage from "./images/search_landing_text.svg";
import SearchSubtitleImage from "./images/search_subtitle.svg";
import SearchIconImage from "./images/search_icon.svg";

import { isDesktop } from 'react-device-detect';

import "./styles/base.scss";
import "./styles/pc.scss";
import "./styles/tablet.scss";
import "./styles/mobile.scss";

function SearchBanner() {
  const displayBackgroundImage = (
    isDesktop
      ? (
      <div
        style={{
          backgroundImage: `url(${SearchBgImage})`
        }}
        className="search_banner__bg_container search_banner--pc__bg_container search_banner--mobile__bg_container search_banner--tablet__bg_container"
      >
        <div
          style={{
            backgroundImage: `url(${SearchLandingTextImage})`
          }}
          className="search_banner__welcome search_banner--pc__welcome"
        />
        <div
          style={{
            backgroundImage: `url(${SearchSubtitleImage})`
          }}
          className="search_banner__subtitle search_banner--pc__subtitle"
        />
      </div>
    ): ''
  )

  return (
    <div className="search_banner search_banner--pc search_banner--mobile search_banner--tablet">
      {displayBackgroundImage}

      <div className="search_banner__group search_banner--pc__group search_banner--tablet__group">
        <div className="search_banner__keyword search_banner--pc__keyword">
          <label htmlFor="fun_place" className="search_banner__keyword__label search_banner--pc__keyword__label">
            <input
              id="fun_place"
              className="search_banner__keyword__input search_banner--pc__keyword__input"
              placeholder="搜尋關鍵字"
              type="text"
              name="input_keyword"
            />
          </label>
        </div>

        <div className="search_banner__dropdown search_banner--pc__dropdown search_banner--tablet__dropdown">
          <Selection defaultText="類別" id="search_category" selectOptions={['景點', '活動', '美食', '民宿']} />
        </div>
        <div className="search_banner__dropdown search_banner--pc__dropdown search_banner--pc__dropdown_city search_banner--tablet__dropdown search_banner--tablet__dropdown_city">
          <Selection defaultText="不分縣市" id="search_city"  selectOptions={['臺北市', '新北市', '桃園市', '台中市', '台南市', '高雄市', '基隆市', '新竹市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '嘉義市', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '金門縣']} />
        </div>

        <div
          style={{
            backgroundImage: `url(${SearchIconImage})`
          }}
          className="search_banner__submit search_banner--pc__submit search_banner--tablet__submit"
        />
      </div>
      <div className="search_banner__shadow search_banner--pc__shadow">
        <div className="search_banner__shadow_left search_banner--pc__shadow_left" />
        <div className="search_banner__shadow_right search_banner--pc__shadow_right" />
      </div>
    </div>
  );
}

export default SearchBanner;
