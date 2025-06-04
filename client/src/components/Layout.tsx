// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  return (
    <>
      <Header pageTitle={pageTitle} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
