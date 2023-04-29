import { useState, useRef, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status) {
      router.replace('/');
    }
  }, [status]);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const response = await signIn('credentials', {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });
    if (response.ok) setStatus(true);
    setError(response.error);
  }

  return (
    <section>
      <h1>Log In</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
      <Link href='/auth/signup'> You don't have account yet? Sign up</Link>
      {error && (
        <div>
          <h3>{error}</h3>
        </div>
      )}
      {status && (
        <div>
          <h3>You are successfully signed in.</h3>
        </div>
      )}
    </section>
  );
}
