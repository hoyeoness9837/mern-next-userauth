import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <section>
      {status === 'authenticated' ? (
        <div>
          Signed in as {session.user.email}
          <Link href='/protected-page'>Protected Page</Link>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          <Link href='/auth/signin'>Sign in</Link>
          <Link href='/auth/signup'>Sign up first</Link>
        </div>
      )}
    </section>
  );
}
