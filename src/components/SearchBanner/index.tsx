import React, { Fragment, useState } from "react";
import styled from "styled-components";
import classNames from "classnames";

import { autoDetectDeviceConverter } from "@utils/StyleConverter";

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

const { px2vw } = autoDetectDeviceConverter();

const BannerContainer = styled.div`
  width: ${px2vw(1280)};
  height: ${px2vw(536)};
  min-width: ${px2vw(1280)};
  min-height: ${px2vw(536)};
`;

const SearchBgImageContainer = styled.div`
  width: ${px2vw(1226)};
  height: ${px2vw(490.6)};
  min-width: ${px2vw(1226)};
  min-height: ${px2vw(490.6)};
  background-image: url(${SearchBgImage});
`;

const SearchLandingTextContainer = styled.div`
  width: ${px2vw(486)};
  height: ${px2vw(70)};
  min-width: ${px2vw(486)};
  min-height: ${px2vw(70)};
  top: ${px2vw(160)};
  left: ${px2vw(367)};
  background-image: url(${SearchLandingTextImage});
`;

const SearchSubtitle = styled.div`
  width: ${px2vw(280)};
  height: ${px2vw(21)};
  min-width: ${px2vw(280)};
  min-height: ${px2vw(21)};
  top: ${px2vw(239)};
  left: ${px2vw(367)};
  background-image: url(${SearchSubtitleImage});
`;

const SearchInputGroupContainer = styled.div`
  width: ${px2vw(492)};
  height: ${px2vw(88)};
  min-width: ${px2vw(492)};
  min-height: ${px2vw(88)};
  top: ${px2vw(269)};
  left: ${px2vw(367)};
`;

const SearchInputContainer = styled.div`
  width: ${px2vw(492)};
  height: ${px2vw(40)};
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
    padding-left: ${px2vw(24)};
    border-radius: ${px2vw(6)};
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
  width: ${px2vw(219)};
  height: ${px2vw(40)};
  margin-top: ${px2vw(8)};
`;

const SearchCitySelection = styled.div`
  width: ${px2vw(219)};
  height: ${px2vw(40)};
  margin-top: ${px2vw(8)};
  margin-left: ${px2vw(6)};
`;

const SearchButton = styled.div`
  width: ${px2vw(40)};
  height: ${px2vw(40)};
  margin-top: ${px2vw(8)};
  margin-left: ${px2vw(8)};
  background-color: #ff1d6c;
  background-image: url(${SearchIconImage});
  background-repeat: no-repeat;
  background-position: center;
  border-radius: ${px2vw(6)};
  box-shadow: ${px2vw(0)} ${px2vw(2)} ${px2vw(4)} rgba(13, 11, 12, 0.2);
`;

const BannerShadowContainer = styled.div`
  width: ${px2vw(1292)};
  height: ${px2vw(52)};
  top: ${px2vw(509)};
`;


const BannerLeftShadow = styled.div`
  margin-left: ${px2vw(6)};
  width: ${px2vw(679.73)};
  height: ${px2vw(52)};
  background-image: url(${LeftShadow});
  background-position-y: ${px2vw(64)};
`;

const BannerRightShadow = styled.div`
  margin-right: ${px2vw(6)};
  width: ${px2vw(679.73)};
  height: ${px2vw(52)};
  background-image: url(${RightShadow});
  background-position-y: ${px2vw(64)};
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
