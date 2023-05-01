import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { Button, Input, InputLabel, Alert } from '@mui/material';
import styles from '../../components/layout.module.css';
import validator from 'validator';

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const jsonData = await response.json();
  return jsonData;
}

export default function SignUp() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState(null);
  const [isPwStrong, setIsPwStrong] = useState(false);
  const [score, setScore] = useState(0);
  const [pwScoreLabel, setPWScoreLabel] = useState('');

  const passwordValidOptions = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: true,
  };

  const switchScoreLabels = (PWScore) => {
    switch (true) {
      case PWScore > 47:
        setPWScoreLabel('Strong');
        break;
      case PWScore < 38 && PWScore > 27:
        setPWScoreLabel('Medium');
        break;
      case PWScore < 28 && PWScore > 17:
        setPWScoreLabel('Weak');
        break;
      case PWScore < 18 && PWScore > 0:
        setPWScoreLabel('Too weak');
        break;
      default:
        break;
    }
  };

  async function passwordEvaluate(event) {
    event.preventDefault();
    const passwordInput = passwordInputRef.current.value;
    const PWScore = validator.isStrongPassword(
      passwordInput,
      passwordValidOptions
    );
    setScore(PWScore);
    switchScoreLabels(PWScore);
    if (PWScore > 47) setIsPwStrong(true);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    if (isPwStrong) {
      const response = await createUser(emailInput, passwordInput);
      setStatus(response.ok);
      setMessage(response.message);
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.container_col}>
        <h1>New Accout</h1>
        <form onSubmit={submitHandler}>
          <InputLabel htmlFor='email'>Your Email</InputLabel>
          <Input type='email' id='email' required inputRef={emailInputRef} />
          <InputLabel htmlFor='password'>Your Password</InputLabel>
          <span className={styles.container_row}>
            <Input
              type='password'
              id='password'
              required
              inputRef={passwordInputRef}
              onChange={(e) => passwordEvaluate(e)}
            />
            {pwScoreLabel && (
              <Alert
                severity={score > 47 ? 'success' : 'warning'}
                sx={{ padding: '2px', margin: '2px' }}
              >
                {pwScoreLabel}
              </Alert>
            )}
          </span>
          <hr />
          <Button type='submit'>Create Account</Button>
        </form>
        <Button onClick={() => signIn()}>
          Already Have an account? Sign In
        </Button>
        {message && (
          <Alert severity={status ? 'info' : 'error'}>{message}</Alert>
        )}
      </div>
    </section>
  );
}
