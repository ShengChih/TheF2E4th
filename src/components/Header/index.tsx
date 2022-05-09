import React from "react";
import styled from "styled-components";
import { getPxConverter } from "@utils/StyleConverter";
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

const { px2vw } = getPxConverter(1920);

const HeaderContainer = styled.div`
  width: ${px2vw(1280)};
  height: ${px2vw(104)};
  min-width: ${px2vw(1280)};
  min-height: ${px2vw(104)};
`;

const TaiwanLogo = styled.div`
  width: ${px2vw(99)};
  height: ${px2vw(57)};
  left: ${px2vw(108)};
  top: ${px2vw(29)};
  background-image: url(${TaiwanLogoImage});
`;

const NavList = styled.div`
  left: ${px2vw(824)};
  top: ${px2vw(54)};
`;

const NavItem = styled.a.attrs((props: NavItemProps) => ({
  href: props.href,
}))`
  width: ${px2vw(125)};
  height: ${px2vw(34)};
  href: ${(props) => props.href};
`;

const NavItemIcon = styled.div.attrs((props: NavItemIconProps) => ({
  backgroundImage: props.backgroundImage,
}))`
  width: ${px2vw(34)};
  height: ${px2vw(34)};
  background-image: url(${(props) => props.backgroundImage});
`;

const NavItemTextLink = styled.span.attrs((props: NavItemTextLinkProps) => ({
  color: props.color,
}))`
  margin-left: ${px2vw(8)};
  height: ${px2vw(20)};
  font-size: ${px2vw(14)};
  line-height: ${px2vw(20)};
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
    <HeaderContainer className="outline-show m-auto relative">
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
