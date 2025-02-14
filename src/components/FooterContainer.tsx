'use client'
import { usePathname } from 'next/navigation';
import React from 'react';
import Footer from './shared/Footer';

const FooterContainer = () => {
    const patheName = usePathname()
    const isAdmin = patheName.includes('/admin')
    return (
        <div>
            { isAdmin? '': <Footer/>}
        </div>
    );
};

export default FooterContainer;