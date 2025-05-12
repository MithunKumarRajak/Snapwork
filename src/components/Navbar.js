'use client';

import Image from 'next/image';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, Globe } from 'lucide-react';

const Navbar = () => {
    const [location, setLocation] = useState('India');

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
            {/* Logo */}
            <Link href="/" className="flex items-center">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={150}
                    height={40}
                    className="w-36 h-10 object-contain"
                />

            </Link>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
                <button><Menu size={24} /></button>
                <button><Search size={24} /></button>
                <button><Globe size={24} /></button>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2">
                <span>{location}</span>
            </div>
        </nav>
    );
};

export default Navbar;
