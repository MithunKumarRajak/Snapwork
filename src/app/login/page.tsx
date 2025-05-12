'use client';

import styles from './login.module.css'; // Import the CSS Module
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
            try {
      const response = await fetch('/api/auth/login', { // Assuming this is your login API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok && data.user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', data.user.id); // Store user ID
        localStorage.setItem('userRole', data.user.role); // Store user role
        router.push('/');
      } else {
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[linear-gradient(135deg,_#e3f2fd,_#bbdefb)]">
            <div className={`${styles.loginContainer} w-full`}> {/* Use CSS module class, keep w-full for responsiveness */}
                <div>
                    {/* h2 will be styled by .loginForm h2 from the CSS module */}
                    <h2>
                        Login
                    </h2>
                </div>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    {/* Removed rounded-md shadow-sm -space-y-px as input groups have their own margin */}
                    <div className={styles.inputGroup}>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            // placeholder=" " // Keep if you want to style based on :placeholder-shown, otherwise :valid handles it
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* Label is styled by CSS module */}
                        <label htmlFor="email-address">Email address</label>
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            // placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Label is styled by CSS module */}
                        <label htmlFor="password">Password</label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={styles.submitButton} // Use CSS module class for the button
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
