'use client';

import { useEffect, useState } from 'react';
import '@/public/admin_css/style.css';
import Modal from '@/components/Modal';
import DOMPurify from 'dompurify';

interface DangKy {
  maDangKy: number;
  ngayDangKy: string;
  viTriGhe: string;
  trangThaiDangKy: string;
  tenKhachHang: string;
  tenSuKien: string;
}

export default function DangKyPage() {
  const [dangKys, setDangKys] = useState<DangKy[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDangKyId, setSelectedDangKyId] = useState<number | null>(null);
  const [selectedDangKy, setSelectedDangKy] = useState<DangKy | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [sortField, setSortField] = useState<null | 'tenKhachHang' | 'tenSuKien' | 'viTriGhe' | 'trangThaiDangKy'>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5555/api/dangky/get/all?page=${page}&size=${pageSize}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setDangKys(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      }
    } catch (err) {
      console.error('Lỗi kết nối:', err);
    }
  };

  const getStatusBadge = (status: string) => {
    const base = 'badge ';
    switch (status) {
      case 'Đang xử lý':
        return base + 'badge-processing';
      case 'Đã hủy':
        return base + 'badge-cancelled';
      case 'Thành công':
        return base + 'badge-success';
      case 'Đã điểm danh':
        return base + 'badge-checkedin';
      default:
        return base + 'badge-default';
    }
  };

  const handleDetailClick = async (maDangKy: number) => {
    setDetailModalOpen(true);
    setSelectedDangKyId(maDangKy);
    setSelectedDangKy(null);
    setLoadingDetail(true);
    setDetailError('');
  
    try {
      const res = await fetch(`http://localhost:5555/api/dangky/get/${maDangKy}`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setSelectedDangKy(data);
      } else {
        setDetailError(data.error || 'Lỗi khi tải chi tiết');
      }
    } catch (err) {
      setDetailError('Không thể kết nối máy chủ');
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      // Toggle direction
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedDangKys = [...dangKys].sort((a, b) => {
    if (!sortField) return 0;
  
    const aVal = a[sortField] || '';
    const bVal = b[sortField] || '';
  
    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });  

  return (
    <main className="main-content">
      <h1>Quản lý Đăng ký Sự kiện</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>STT</th>
            <th onClick={() => handleSort('tenSuKien')} className="sortable">
            Tên sự kiện {sortField === 'tenSuKien' ? (sortAsc ? '▲' : '▼') : '↕'}
            </th>
            <th onClick={() => handleSort('tenKhachHang')} className="sortable">
            Tên khách hàng {sortField === 'tenKhachHang' ? (sortAsc ? '▲' : '▼') : '↕'}
            </th>
            <th onClick={() => handleSort('trangThaiDangKy')} className="sortable">
            Trạng thái {sortField === 'trangThaiDangKy' ? (sortAsc ? '▲' : '▼') : '↕'}
            </th>
            <th onClick={() => handleSort('viTriGhe')} className="sortable">
            Vị trí ghế {sortField === 'viTriGhe' ? (sortAsc ? '▲' : '▼') : '↕'}
            </th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sortedDangKys.map((dk, index) => (
            <tr key={dk.maDangKy} className={index % 2 === 0 ? 'even' : 'odd'}>
              <td>{page * pageSize + index + 1}</td>
              <td>{DOMPurify.sanitize(dk.tenSuKien)}</td>
              <td>{DOMPurify.sanitize(dk.tenKhachHang)}</td>
              <td>
                <span className={getStatusBadge(dk.trangThaiDangKy)}>
                  {DOMPurify.sanitize(dk.trangThaiDangKy)}
                </span>
              </td>
              <td>{DOMPurify.sanitize(dk.viTriGhe)}</td>
              <td>
                <button className="edit-btn" onClick={() => handleDetailClick(dk.maDangKy)}>Chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <span>
          Trang {page + 1} / {totalPages} | Hiển thị {dangKys.length} / {totalElements}
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

      {detailModalOpen && (
        <Modal
            isOpen={detailModalOpen}
            onClose={() => {
            setDetailModalOpen(false);
            setSelectedDangKy(null);
            setSelectedDangKyId(null);
            setDetailError('');
            }}
            title="Chi tiết đăng ký"
        >
            {loadingDetail ? (
            <p>Đang tải...</p>
            ) : detailError ? (
            <p className="error-text">{detailError}</p>
            ) : selectedDangKy ? (
            <div className="detail-info">
                <p><strong>Mã Đăng ký:</strong> {DOMPurify.sanitize(String(selectedDangKy.maDangKy))}</p>
                <p><strong>Tên sự kiện:</strong> {DOMPurify.sanitize(selectedDangKy.tenSuKien)}</p>
                <p><strong>Tên khách hàng:</strong> {DOMPurify.sanitize(selectedDangKy.tenKhachHang)}</p>
                <p><strong>Ngày đăng ký:</strong> {DOMPurify.sanitize(selectedDangKy.ngayDangKy)}</p>
                <p><strong>Vị trí ghế:</strong> {DOMPurify.sanitize(selectedDangKy.viTriGhe)}</p>
                <p><strong>Trạng thái:</strong> <span className={getStatusBadge(selectedDangKy.trangThaiDangKy)}>
                {DOMPurify.sanitize(selectedDangKy.trangThaiDangKy)}
                </span></p>
            </div>
            ) : (
            <p>Dữ liệu không tồn tại</p>
            )}
        </Modal>
      )}

    </main>
  );
}
