// c:\snapwork\src\components\Footer.js
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-400 py-10 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <Link href="/about" className="px-3 py-2 hover:text-white transition-colors">About Us</Link>
          <span className="text-gray-600">|</span>
          <Link href="/contact" className="px-3 py-2 hover:text-white transition-colors">Contact Us</Link>
          <span className="text-gray-600">|</span>
          <Link href="/privacy-policy" className="px-3 py-2 hover:text-white transition-colors">Privacy Policy</Link>
          <span className="text-gray-600">|</span>
          <Link href="/terms-of-service" className="px-3 py-2 hover:text-white transition-colors">Terms of Service</Link>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {currentYear} SnapWork. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;