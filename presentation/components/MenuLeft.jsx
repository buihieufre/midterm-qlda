'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MenuLeft = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Quản Lý Sinh Viên',
      href: '/',
      icon: '👥'
    }
  ];

  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default MenuLeft;

