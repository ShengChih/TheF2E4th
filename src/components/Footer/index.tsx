import baseStyles from './styles/base.module.scss'
import pcStyles from './styles/pc.module.scss'

function Footer() {
  return <footer className={`${baseStyles.footer} ${pcStyles.footer}`}>Taiwan Tourguide  © Code: ShengChih.Chu  /  Design: KT</footer>
}

export default Footer;
