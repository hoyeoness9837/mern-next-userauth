import { useSession } from 'next-auth/react';
import styles from '../components/layout.module.css';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <section className={styles.section}>
      <div className={styles.container_col}>
        {status === 'authenticated' ? (
          <h2>Signed in as {session.user.email}</h2>
        ) : (
          <>
            <h2>Welcome, Feel free to try!</h2>
          </>
        )}
      </div>
    </section>
  );
}
