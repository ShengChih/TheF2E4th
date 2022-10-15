import React from "react";
import TaiwanLogoImage from "./TaiwanLogo.svg";
import FirstNavIcon from "./FirstNavIcon.svg";
import SecondNavIcon from "./SecondNavIcon.svg";
import ThirdNavIcon from "./ThirdNavIcon.svg";

const items = [
  {
    itemLink: "",
    itemColor: "#FF1D6C",
    linkText: "台灣景點",
    backgroundImg: FirstNavIcon,
  },
  {
    itemLink: "",
    itemColor: "#FFB72C",
    linkText: "美食住宿",
    backgroundImg: SecondNavIcon,
  },
  {
    itemLink: "",
    itemColor: "#007350",
    linkText: "景點交通",
    backgroundImg: ThirdNavIcon,
  },
];

function Header() {
  return (
    <div className="w-full max-w-[1280px] h-[104px] outline-show mx-auto relative">
      <div
        style={{
          backgroundImage: `url(${TaiwanLogoImage})`
        }}
        className={'w-[99px] h-[57px] left-[108px] top-[29px] outline-show absolute bg-no-repeat bg-cover'}
      />
      <div className="outline-show flex absolute left-[824px] top-[54px]">
        {items.map(({ itemLink, itemColor, linkText, backgroundImg }) => (
          <a href={itemLink} className="outline-show left-[125px] top-[34px] flex items-end">
            <div
              style={{
                backgroundImage: `url(${backgroundImg})`
              }}
              className="flex rounded-full bg-cover w-[34px] h-[34px]"
            />
            <span
              style={{
                textDecoration: itemColor,
                color: itemColor
              }}
              className="flex no-underline ml-[8px] h-[20px] text-[14px] leading-[20px]"
            >
              {linkText}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Header;
