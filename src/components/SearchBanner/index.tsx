import React, { Fragment, useState } from "react";
import styled from "styled-components";
import classNames from "classnames";

import Selection from "@components/Selection";
import SearchBgImage from "./search_bg_img_1.png";
import SearchLandingTextImage from "./search_landing_text.svg";
import SearchSubtitleImage from "./search_subtitle.svg";
import SearchIconImage from "./search_icon.svg";
import LeftShadow from "./banner_left_shadow.png"
import RightShadow from "./banner_right_shadow.png"

import {
  SearchInputProps,
  // @ts-ignore
} from "./typing.d.ts";


const BannerContainer = styled.div`
  width: 1280px;
  height: 536px;
  min-width: 1280px;
  min-height: 536px;
`;

const SearchBgImageContainer = styled.div`
  width: 1226px;
  height: 490.6px;
  min-width: 1226px;
  min-height: 490.6px;
  background-image: url(${SearchBgImage});
`;

const SearchLandingTextContainer = styled.div`
  width: 486px;
  height: 70px;
  min-width: 486px;
  min-height: 70px;
  top: 160px;
  left: 367px;
  background-image: url(${SearchLandingTextImage});
`;

const SearchSubtitle = styled.div`
  width: 280px;
  height: 21px;
  min-width: 280px;
  min-height: 21px;
  top: 239px;
  left: 367px;
  background-image: url(${SearchSubtitleImage});
`;

const SearchInputGroupContainer = styled.div`
  width: 492px;
  height: 88px;
  min-width: 492px;
  min-height: 88px;
  top: 269px;
  left: 367px;
`;

const SearchInputContainer = styled.div`
  width: 492px;
  height: 40px;
`;

function SearchInput({
  htmlFor,
  inputName,
  placeholderText,
  placeholderTextColor,
}: SearchInputProps) {
  const InputText = styled.input.attrs({
    placeholder: placeholderText,
    type: "text",
    name: inputName,
  })`
    padding-left: 24px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(13, 11, 12, 0.2);
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${placeholderTextColor};
    }
    :-ms-input-placeholder {
      color: ${placeholderTextColor};
    }
  `;
  return (
    <SearchInputContainer>
      <label htmlFor={htmlFor} className="relative block w-full h-full">
        <InputText id={htmlFor} className="w-full h-full" />
        {htmlFor}
      </label>
    </SearchInputContainer>
  );
}

const SearchCategorySelection = styled.div`
  width: 219px;
  height: 40px;
  margin-top: 8px;
`;

const SearchCitySelection = styled.div`
  width: 219px;
  height: 40px;
  margin-top: 8px;
  margin-left: 6px;
`;

const SearchButton = styled.div`
  width: 40px;
  height: 40px;
  margin-top: 8px;
  margin-left: 8px;
  background-color: #ff1d6c;
  background-image: url(${SearchIconImage});
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 6px;
  box-shadow: 0)} 2)} 4)} rgba(13, 11, 12, 0.2);
`;

const BannerShadowContainer = styled.div`
  width: 1292px;
  height: 52px;
  top: 509px;
`;


const BannerLeftShadow = styled.div`
  margin-left: 6px;
  width: 679.73px;
  height: 52px;
  background-image: url(${LeftShadow});
  background-position-y: 64px;
`;

const BannerRightShadow = styled.div`
  margin-right: 6px;
  width: 679.73px;
  height: 52px;
  background-image: url(${RightShadow});
  background-position-y: 64px;
`;

function SearchBanner() {
  const placeholderTextColor = "#d2d2d2";

  return (
    <div className="flex mx-auto relative">
      <BannerContainer className="outline-show flex items-center justify-center mx-auto bg-white	">
        <SearchBgImageContainer className="flex flex-col absolute bg-no-repeat bg-cover">
          <SearchLandingTextContainer className="outline-show flex absolute bg-no-repeat" />
          <SearchSubtitle className="absolute bg-no-repeat bg-center" />
          <SearchInputGroupContainer className="outline-show flex flex-row flex-wrap absolute ">
            <SearchInputContainer className="outline-show flex">
              <SearchInput
                htmlFor="fun_place"
                inputName="search"
                placeholderText="搜尋關鍵字"
                placeholderTextColor={placeholderTextColor}
              />
            </SearchInputContainer>
            <SearchCategorySelection className="outline-show flex relative">
              <Selection defaultText="類別" />
            </SearchCategorySelection>
            <SearchCitySelection className="outline-show flex relative">
              <Selection defaultText="不分縣市" />
            </SearchCitySelection>
            <SearchButton className="outline-show flex" />
          </SearchInputGroupContainer>
        </SearchBgImageContainer>
        <BannerShadowContainer className="flex outline-show mx-auto -z-10 absolute">
          <BannerLeftShadow className="opacity-70 " />
          <BannerRightShadow className="opacity-70 " />
        </BannerShadowContainer>
      </BannerContainer>
    </div>
  );
}

export default SearchBanner;
