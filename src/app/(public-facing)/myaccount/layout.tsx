'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import '@/public/css/style.css';
import '@/public/css/my-account.css';
import { useUser } from '@/context/UserContext';

function MyAccountContent({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'THÔNG TIN CÁ NHÂN', href: '/myaccount/personal-info', section: 'personal-info' },
    { label: 'ĐỔI MẬT KHẨU', href: '/myaccount/change-password', section: 'account-info' },
    { label: 'LỊCH SỬ GIAO DỊCH', href: '/myaccount/orders', section: 'orders' },
    { label: 'ĐĂNG XUẤT', href: '/logout', section: 'logout' },
  ];

  if (user === null) {
    return <p style={{ textAlign: 'center' }}>Đang tải thông tin người dùng...</p>;
  }

  if (!user || user.vaiTro !== 'KhachHang') {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5555/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null); // clear context
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="account-container">
        {/* Sidebar Navigation */}
        <div className="sidebar">
        {navItems.map((item) => (
            <div
              key={item.section}
              className={`sidebar-item ${pathname === item.href ? ' active' : ''}`}
              data-section={item.section}
              onClick={item.section === 'logout' ? handleLogout : undefined}
              style={{ cursor: item.section === 'logout' ? 'pointer' : 'default' }}
            >
              {item.section === 'logout' ? (
                <span>{item.label}</span>
              ) : (
                <Link className="nostyle" href={item.href}>
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
        ))}
        </div>

        <div className="content">
        {children}
        </div>
    </div>
  );
}

export default function MyAccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
            <MyAccountContent>{children}</MyAccountContent>
      </body>
    </html>
  );
}
