import { useState, useRef, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Input, InputLabel, Alert } from '@mui/material';
import styles from '../../components/layout.module.css';

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
    setStatus(response.ok);
    setError(response.error);
  }

  return (
    <section className={styles.section}>
      <div className={styles.container_col}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <InputLabel htmlFor='email'>Your Email</InputLabel>
          <Input type='email' id='email' required inputRef={emailInputRef} />

          <InputLabel htmlFor='password'>Your Password</InputLabel>
          <Input
            type='password'
            id='password'
            required
            inputRef={passwordInputRef}
          />
          <hr />
          <Button type='submit'>Login</Button>
        </form>
        <Button onClick={() => router.push('/auth/signup')}>
          You don't have account yet? Sign up
        </Button>
        {error && <Alert severity='error'>{error}</Alert>}
        {status && (
          <Alert severity='success'>You are successfully signed in.</Alert>
        )}
      </div>
    </section>
  );
}
