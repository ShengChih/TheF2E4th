import styled from "styled-components";
import { getPxConverter } from "@utils/StyleConverter";

const { px2vw } = getPxConverter(1920);

const FooterBody = styled.footer`
  width: ${px2vw(1280)};
  height: ${px2vw(65)};
  line-height: ${px2vw(65)};
  text-align: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: ${px2vw(12)};

  color: #ACACAC;
`

function Footer() {
  return <FooterBody className="mx-auto bg-white">Taiwan Tourguide  © Code: ShengChih.Chu  /  Design: KT</FooterBody>
}

export default Footer;
