import styled from 'styled-components';
import taiwan_img from './taiwan_logo.png'
import first_icon from './FirstNavIcon.svg'
import second_icon from './SecondNavIcon.svg'
import third_icon from './ThirdNavIcon.svg'

const HeaderContainer = styled.div`
  margin: auto;
  outline: 1px solid #000;
  width: 1280px;
  height: 104px;
  min-width: 1280px;
  min-height: 104px;
  position: relative;
`

const TaiwanLogo = styled.div`
  width: 99px;
  height: 57px;
  outline: 1px solid #000;
  left: 108px;
  top: 29px;
  position: absolute;
  background-image: url(${taiwan_img});
  background-repeat: no-repeat;
`

type NavItemProps = {
  href: string
}

type NavItemIconProps = {
  backgroundImage: string
}

type NavItemTextLinkProps = {
  color: string
}

const NavList = styled.div`
  display: flex;
  position: absolute;
  left: 824px;
  top: 54px;
`

const NavItem = styled.a.attrs((props: NavItemProps) => ({
  href: props.href
}))`
  display: flex;
  width: 125px;
  height: 34px;
  href: ${props => props.href};
  position: relative;
  align-items: flex-end;
`

const NavItemIcon = styled.div.attrs((props: NavItemIconProps) => ({
  backgroundImage: props.backgroundImage
}))`
  display: flex;
  width: 34px;
  height: 34px;
  background-image: url(${props => props.backgroundImage});
  position: relative;
  border-radius: 50%;
`
const NavItemTextLink = styled.span.attrs((props: NavItemTextLinkProps) => ({
  color: props.color
}))`
  display: flex;
  margin-left: 8px;
  height: 20px;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: underline;
  text-decoration-color: ${props => props.color};
  color: ${props => props.color};
`

const items = [
  {
    item_link: "",
    item_color: "#FF1D6C",
    link_text: "台灣景點",
    background_img: first_icon,
  },
  {
    item_link: "",
    item_color: "#FFB72C",
    link_text: "美食住宿",
    background_img: second_icon,
  },
  {
    item_link: "",
    item_color: "#007350",
    link_text: "景點交通",
    background_img: third_icon,
  }
]

export const Header = () => (
  <HeaderContainer>
    <TaiwanLogo />
    <NavList>
    {
      items.map(({item_link, item_color, link_text, background_img}) => (
        <NavItem href={item_link}>
          <NavItemIcon backgroundImage={background_img}></NavItemIcon>
          <NavItemTextLink color={item_color}>{link_text}</NavItemTextLink>
        </NavItem>
      ))
    }
    </NavList>
  </HeaderContainer>
)
