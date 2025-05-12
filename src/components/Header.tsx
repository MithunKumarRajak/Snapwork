// c:\snapwork\src\components\Header.tsx
'use client'; // Add this because we'll use useState and useEffect for localStorage

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check login status from localStorage when component mounts on client-side
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');

    // Optional: Listen for storage changes to update UI if login status changes in another tab
    const handleStorageChange = () => {
      const currentStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(currentStatus === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/'); // Redirect to home page after logout
    // Optionally, you might want to refresh the page or specific components
    // router.refresh(); // if you need to re-fetch server components or re-run loaders
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-200">
          SnapWork
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:text-blue-200 hover:underline">Home</Link>
          {isLoggedIn ? (
            <>
              <Link href="/post-job" className="hover:text-blue-200 hover:underline">Post Job</Link>
              <button onClick={handleLogout} className="hover:text-blue-200 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-200 hover:underline">Login</Link>
              <Link href="/signup" className="hover:text-blue-200 hover:underline">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;