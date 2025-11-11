import { NavLink } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../Logo/Logo"
import Button from "../Button/Button";

import styles from "./PageNav.module.css"


function PageNav() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        {isAuthenticated ?
        <> 
          <li>
            <div className={styles.normaltext}>Hi, {user.name} ⭐</div>
          </li>
          <li>
            <Button type="back" onClick={logout}>Logout</Button>
          </li>
        </>
        : <li>
            <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
          </li>}
      </ul>
    </nav>
  )
}

export default PageNav
