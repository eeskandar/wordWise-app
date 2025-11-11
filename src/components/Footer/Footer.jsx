import styles from "./Footer.module.css"


function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        Copyright &copy; 2027 by WorldWise. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
