// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SnapWork',
  description: 'Your Smart Work Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* Use the Header component */}
        <main style={{ padding: '2rem' }}>{children}</main>
        <Footer /> {/* Add the Footer component here */}

      </body>
    </html>
  )
}
