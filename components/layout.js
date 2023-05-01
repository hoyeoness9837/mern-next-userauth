import styles from './layout.module.css';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <section className={styles.section__container}>{children}</section>
    </>
  );
}
