'use client'
import { usePathname } from 'next/navigation';
import React from 'react';
import Footer from './shared/Footer';

const FooterContainer = () => {
    const patheName = usePathname()
    const isAdmin = patheName.startsWith('/admin') || patheName.startsWith('/dashboard')
    return (
        <div>
            { isAdmin? '': <Footer/>}
        </div>
    );
};

export default FooterContainer;