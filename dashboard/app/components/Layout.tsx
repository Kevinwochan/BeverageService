import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-grow p-8">
      {children}
    </main>
  </div>
);

export default Layout;