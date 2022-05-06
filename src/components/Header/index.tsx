import styled from 'styled-components';
import taiwan_img from './taiwan_logo.png'
import first_icon from './FirstNavIcon.svg'
import second_icon from './SecondNavIcon.svg'
import third_icon from './ThirdNavIcon.svg'
import { px2Rem } from '@utils/StyleConverter';

const HeaderContainer = styled.div`
  width: ${px2Rem(1280, 16)};
  height: ${px2Rem(104, 16)};
  min-width: ${px2Rem(1280, 16)};
  min-height: ${px2Rem(104, 16)};
`

const TaiwanLogo = styled.div`
  width: ${px2Rem(99, 16)};
  height: ${px2Rem(57, 16)};
  left: ${px2Rem(108, 16)};
  top: ${px2Rem(29, 16)};
  background-image: url(${taiwan_img});
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
  left: ${px2Rem(824, 16)};
  top: ${px2Rem(54, 16)};
`

const NavItem = styled.a.attrs((props: NavItemProps) => ({
  href: props.href
}))`
  width: ${px2Rem(125, 16)};
  height: ${px2Rem(34, 16)};
  href: ${props => props.href};
`

const NavItemIcon = styled.div.attrs((props: NavItemIconProps) => ({
  backgroundImage: props.backgroundImage
}))`
  width: ${px2Rem(34, 16)};
  height: ${px2Rem(34, 16)};
  background-image: url(${props => props.backgroundImage});
`

const NavItemTextLink = styled.span.attrs((props: NavItemTextLinkProps) => ({
  color: props.color
}))`
  margin-left: ${px2Rem(8, 16)};
  height: ${px2Rem(20, 16)};
  font-size: ${px2Rem(14, 16)};
  line-height: ${px2Rem(20, 16)};
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
  <HeaderContainer className='outline-show m-auto relative' >
    <TaiwanLogo className='outline-show absolute bg-no-repeat' />
    <NavList className='outline-show flex absolute'>
      {
        items.map(({ item_link, item_color, link_text, background_img }) => (
          <NavItem href={item_link} className='outline-show flex items-end'>
            <NavItemIcon backgroundImage={background_img} className='flex rounded-full'></NavItemIcon>
            <NavItemTextLink color={item_color} className='flex no-underline'>{link_text}</NavItemTextLink>
          </NavItem>
        ))
      }
    </NavList>
  </HeaderContainer>
)
