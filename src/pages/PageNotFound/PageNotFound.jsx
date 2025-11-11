import PageNav from "../../components/PageNav/PageNav";
import styles from "./PageNotFound.module.css";


export default function PageNotFound() {
  return (
    <main className={styles.pageNotFound}>
      <PageNav />
      <section>
        <h1>
          Woops! 404!
        </h1>
        <h2>
          The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
        </h2>
      </section>
    </main>
  );
}