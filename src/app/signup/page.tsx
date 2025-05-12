'use client';

import styles from './signup.module.css'; // Import the CSS Module
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add signup logic here
    alert(`Signing up with: ${firstName} ${lastName}, ${email}`);
    router.push('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[linear-gradient(135deg,_#e3f2fd,_#bbdefb)]">
      <div className={`${styles.signupContainer} w-full`}>
        <div>
          <h2>
            Sign Up
          </h2>
        </div>
        <form className={styles.signupForm} onSubmit={handleSignup}>
          <div className={styles.inputGroup}>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="firstName">First Name</label>
          </div>

          <div className={styles.inputGroup}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
          </div>

          <div className={styles.inputGroup}>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email-address">Email address</label>
          </div>

          <div className={styles.inputGroup}>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div>
            <button
              type="submit"
              className={styles.submitButton}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
