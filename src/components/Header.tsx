import styles from './Header.module.css'

import RocketLogo from '../assets/rocket-logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
    <strong>
      <img src={RocketLogo} alt="Logo da Rocketseat" />
      to<span>do</span>
    </strong>
  </header>
   )
}