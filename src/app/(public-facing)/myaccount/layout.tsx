'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import '@/public/css/style.css';
import '@/public/css/my-account.css';
import { useUser } from '@/context/UserContext';

function MyAccountContent({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'THÔNG TIN CÁ NHÂN', href: '/myaccount/personal-info', section: 'personal-info' },
    { label: 'ĐỔI MẬT KHẨU', href: '/myaccount/account-info', section: 'account-info' },
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

  return (
    <div className="account-container">
        {/* Sidebar Navigation */}
        <div className="sidebar">
        {navItems.map((item) => (
            <Link href={item.href} key={item.section}>
            <div
                className={`sidebar-item ${pathname === item.href ? ' active' : ''}`}
                data-section={item.section}
            >
                <span>{item.label}</span>
            </div>
            </Link>
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
        <main>
            <section>
                <MyAccountContent>{children}</MyAccountContent>
            </section>
        </main>
      </body>
    </html>
  );
}
