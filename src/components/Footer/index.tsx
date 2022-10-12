import styled from "styled-components";

const FooterBody = styled.footer`
  width: 1280px;
  height: 65px;
  line-height: 65px;
  text-align: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;

  color: #ACACAC;
`

function Footer() {
  return <FooterBody className="mx-auto bg-white">Taiwan Tourguide  © Code: ShengChih.Chu  /  Design: KT</FooterBody>
}

export default Footer;
