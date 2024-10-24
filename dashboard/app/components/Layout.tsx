import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Sidebar />
    <main className="py-10 px-20 sm:ml-64">
      {children}
    </main>
  </>
);

export default Layout;