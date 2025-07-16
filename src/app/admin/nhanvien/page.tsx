'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import '@/public/admin_css/style.css';
import Modal from '@/components/Modal';

interface NhanVien {
  tenDangNhap: string;
  trangThai: string;
  vaiTro: string;
  hoTen: string;
  diaChi: string;
  email: string;
  phone: string;
  gioiTinh: string;
  soTuoi: number;
}

export default function NhanVienPage() {
  const [nhanViens, setNhanViens] = useState<NhanVien[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5555/api/admin/nhanvien/get/all?page=${page}&size=${pageSize}`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setNhanViens(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      }
    } catch (err) {
      console.error('Lỗi kết nối:', err);
    }
  };

  const getStatusBadge = (status: string) => {
    const base = 'badge ';
    return status === 'Hoạt Động'
      ? base + 'badge-success'
      : base + 'badge-cancelled';
  };

  return (
    <main className="main-content">
      <h1>Quản lý Nhân viên</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên nhân viên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {nhanViens.map((nv, index) => (
            <tr key={nv.tenDangNhap} className={index % 2 === 0 ? 'even' : 'odd'}>
              <td>{page * pageSize + index + 1}</td>
              <td>{DOMPurify.sanitize(nv.hoTen)}</td>
              <td>{DOMPurify.sanitize(nv.email)}</td>
              <td>{DOMPurify.sanitize(nv.phone)}</td>
              <td>
                <span className={getStatusBadge(nv.trangThai)}>{DOMPurify.sanitize(nv.trangThai)}</span>
              </td>
              <td>
                <button className="edit-btn">Chi tiết</button>
                <button className="delete-btn">Thay đổi trạng thái</button>
              </td>
            </tr>
          ))}
          {nhanViens.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '10px' }}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="table-footer">
        <span>
          Trang {page + 1} / {totalPages} | Hiển thị {nhanViens.length} / {totalElements}
        </span>

        <div className="pagination-buttons">
          <button
            disabled={page === 0}
            className="pagination-btn"
            onClick={() => setPage((p) => p - 1)}
          >
            Trước
          </button>
          <button
            disabled={page + 1 >= totalPages}
            className="pagination-btn"
            onClick={() => setPage((p) => p + 1)}
          >
            Sau
          </button>
        </div>
      </div>
    </main>
  );
}
