import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
       <h1>Hello World!</h1>
       <p>Simple NextJS with Bootstrap Application Base</p>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
