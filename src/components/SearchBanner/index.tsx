import React, { useState } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { getPxConverter } from "@utils/StyleConverter";
import SearchBgImage from "./search_bg_img_1.png";
import SearchLandingTextImage from "./search_landing_text.svg";
import SearchSubtitleImage from "./search_subtitle.svg";

import {
  SearchInputProps,
  ListObject,
  SelectionOption,
  // @ts-ignore
} from "./typing.d.ts";

const { px2vw } = getPxConverter(1920);

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
  elementKey,
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
    <label htmlFor={elementKey} className="relative block w-full h-full">
      <InputText id={elementKey} className="w-full h-full" />
    </label>
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

function Selection() {
  const [selected, setSelected] = useState<Array<any>>();
  const SelectionButton = styled.button``;

  const Dropdown = styled.ul;

  return (
    <SelectionButton>
      <ul>
        <li />
      </ul>
    </SelectionButton>
  );
}

const SearchButton = styled.div`
  width: ${px2vw(40)};
  height: ${px2vw(40)};
  margin-top: ${px2vw(8)};
  margin-left: ${px2vw(8)};
`;

function SearchBanner() {
  const placeholderTextColor = "#d2d2d2";

  return (
    <BannerContainer className="outline-show flex items-center justify-center m-auto">
      <SearchBgImageContainer className="flex flex-col absolute bg-no-repeat bg-cover">
        <SearchLandingTextContainer className="outline-show flex absolute bg-no-repeat" />
        <SearchSubtitle className="absolute bg-no-repeat bg-center" />
        <SearchInputGroupContainer className="outline-show flex flex-row flex-wrap absolute ">
          <SearchInputContainer className="outline-show flex">
            <SearchInput
              inputName="search"
              placeholderText="搜尋關鍵字"
              placeholderTextColor={placeholderTextColor}
            />
          </SearchInputContainer>
          <SearchCategorySelection className="outline-show flex" />
          <SearchCitySelection className="outline-show flex" />
          <SearchButton className="outline-show flex" />
        </SearchInputGroupContainer>
      </SearchBgImageContainer>
    </BannerContainer>
  );
}

export default SearchBanner;
