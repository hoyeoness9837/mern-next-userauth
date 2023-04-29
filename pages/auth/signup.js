import { signIn } from 'next-auth/react';
import { useState, useRef } from 'react';

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
  const [error, setError] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const response = await createUser(enteredEmail, enteredPassword);
    setError(response.message);
  }
  return (
    <section>
      <h1>New Accout</h1>
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
          <button>Create Account</button>
        </div>
      </form>
      <button onClick={() => signIn()}>Already Have an account? Sign In</button>
      {error && (
        <div>
          <h3>{error}</h3>
        </div>
      )}
    </section>
  );
}
