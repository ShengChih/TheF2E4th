import React from "react";
import styled from "styled-components";
import TaiwanLogoImage from "./taiwan_logo.png";
import FirstNavIcon from "./FirstNavIcon.svg";
import SecondNavIcon from "./SecondNavIcon.svg";
import ThirdNavIcon from "./ThirdNavIcon.svg";

import {
  NavItemProps,
  NavItemIconProps,
  NavItemTextLinkProps,
  // @ts-ignore
} from "./typing.d.ts";


const HeaderContainer = styled.div`
  width: 1280px;
  height: 104px;
  min-width: 1280px;
  min-height: 104px;
`;

const TaiwanLogo = styled.div`
  width: 99px;
  height: 57px;
  left: 108px;
  top: 29px;
  background-image: url(${TaiwanLogoImage});
`;

const NavList = styled.div`
  left: 824px;
  top: 54px;
`;

const NavItem = styled.a.attrs((props: NavItemProps) => ({
  href: props.href,
}))`
  width: 125px;
  height: 34px;
  href: ${(props) => props.href};
`;

const NavItemIcon = styled.div.attrs((props: NavItemIconProps) => ({
  backgroundImage: props.backgroundImage,
}))`
  width: 34px;
  height: 34px;
  background-image: url(${(props) => props.backgroundImage});
`;

const NavItemTextLink = styled.span.attrs((props: NavItemTextLinkProps) => ({
  color: props.color,
}))`
  margin-left: 8px;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  text-decoration-color: ${(props) => props.color};
  color: ${(props) => props.color};
`;

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
    <HeaderContainer className="outline-show mx-auto relative">
      <TaiwanLogo className="outline-show absolute bg-no-repeat bg-cover" />
      <NavList className="outline-show flex absolute">
        {items.map(({ itemLink, itemColor, linkText, backgroundImg }) => (
          <NavItem href={itemLink} className="outline-show flex items-end">
            <NavItemIcon
              backgroundImage={backgroundImg}
              className="flex rounded-full bg-cover"
            />
            <NavItemTextLink color={itemColor} className="flex no-underline">
              {linkText}
            </NavItemTextLink>
          </NavItem>
        ))}
      </NavList>
    </HeaderContainer>
  );
}

export default Header;
