'use client';

import React from 'react';
import Link from 'next/link';
import '@/public/admin_css/style.css';
import { UserProvider, useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

function AdminContent({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  if (user === null) {
    return <p style={{ textAlign: 'center' }}>Đang tải thông tin người dùng...</p>;
  }

  if (!user || (user.vaiTro !== 'NhanVien' && user.vaiTro !== 'QuanLy')) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  const isQuanLy = user.vaiTro === 'QuanLy';

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          {isQuanLy && <Link href="/admin/dashboard">Dashboard</Link>}
          <Link href="/admin/sukien">Sự kiện</Link>
          <Link href="/admin/danhmuc">Danh mục</Link>
          <Link href="/admin/dangky">Đăng ký</Link>
          <Link href="/admin/hoadon">Hóa đơn</Link>
          <Link href="/admin/diemdanh">Điểm danh</Link>
          {isQuanLy && <Link href="/admin/taikhoan">Tài khoản</Link>}
          <Link href="/admin/danhgia">Đánh giá</Link>
          <Link href="/admin/cauhoi">Câu hỏi</Link>
          <Link href="/admin/ticket">Ticket</Link>
        </nav>
      </aside>

      <main className="admin-content">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <UserProvider>
          <AdminContent>{children}</AdminContent>
        </UserProvider>
      </body>
    </html>
  );
}
