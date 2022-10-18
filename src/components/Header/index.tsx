import React from "react";
import TaiwanLogoImage from "./TaiwanLogo.svg";
import FirstNavIcon from "./FirstNavIcon.svg";
import SecondNavIcon from "./SecondNavIcon.svg";
import ThirdNavIcon from "./ThirdNavIcon.svg";
import { isDesktop, isTablet, isMobile } from 'react-device-detect';

import './Header.scss'

/**
 * Don't use sass/scss @import for different devices classnames, 
 * because that causes postcss-px-to-vw packages
 * execute in wrong ordered postcss plugins
 * 
 * 因為 sass/scss 透過 postcss-import 支援 @import 語法
 * 因此 postcss-import 先於 postcss-px-to-vw 將所有的 sass/scss 檔案匯聚成一份
 * 就不能使用 postcss-px-to-vw exclude / include 的設定根據不同 designedWidth 設定 config
 * px 轉 vw 就會只用最先執行的 config 轉。
 * 
 * 這只會限制特別的裝置 styles，針對 media query 內的用法，其他不在意可使用 @import
 */
import './pc.scss';
import './mobile.scss';
import './tablet.scss';

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
  const itemList = (
    isDesktop || isTablet
    ? (
      <div className="header__items header--mobile__items header--tablet__items header--pc__items">
      {items.map(({ itemLink, itemColor, linkText, backgroundImg }, index) => (
        <a key={`item-${index}`}  href={itemLink}>
          <div
            style={{
              backgroundImage: `url(${backgroundImg})`
            }}
          />
          <span
            style={{
              textDecoration: itemColor,
              color: itemColor
            }}
          >{linkText}</span>
        </a>
      ))}
      </div>
      )
      : ''
  )

  return (
    <div className="header header--mobile header--tablet header--pc">
      <div
        style={{
          backgroundImage: `url(${TaiwanLogoImage})`
        }}
        className="header__logo header--mobile__logo header--tablet__logo header--pc__logo"
      />
      {itemList}
    </div>
  );
}

export default Header;
