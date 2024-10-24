import React from 'react';

const Sidebar: React.FC = () => (
  <aside className="w-48 border-r border-gray-200">
    <nav className="py-4">
      <ul className="space-y-2">
        {['Beer Me', 'Inventory', 'Reports', 'Ordering', 'Notifications'].map((item, index) => (
          <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{item}</li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;