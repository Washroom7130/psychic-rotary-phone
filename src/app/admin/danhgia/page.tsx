'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import '@/public/admin_css/style.css';
import Modal from '@/components/Modal';

export default function DanhGiaPage() {
  const [danhGias, setDanhGias] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDanhGia, setSelectedDanhGia] = useState<any | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState('');
  const pageSize = 10;

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5555/api/danhgia/get/all?page=${page}&size=${pageSize}`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setDanhGias(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      }
    } catch (err) {
      console.error('Lỗi kết nối:', err);
    }
  };

  const handleDetailClick = async (maDanhGia: number) => {
    setDetailModalOpen(true);
    setSelectedDanhGia(null);
    setLoadingDetail(true);
    setDetailError('');
  
    try {
      const res = await fetch(`http://localhost:5555/api/danhgia/get/${maDanhGia}`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setSelectedDanhGia(data);
      } else {
        setDetailError(data.error || 'Lỗi khi tải chi tiết');
      }
    } catch (err) {
      setDetailError('Không thể kết nối máy chủ');
    } finally {
      setLoadingDetail(false);
    }
  };  

  const handleDeleteClick = (maDanhGia: number) => {
    console.log('Xóa:', maDanhGia);
    // To be implemented in the next step
  };

  return (
    <main className="main-content">
      <h1>Quản lý Đánh giá</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên khách hàng</th>
            <th>Tên sự kiện</th>
            <th>Số sao</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {danhGias.map((dg, index) => (
            <tr key={dg.maDanhGia} className={index % 2 === 0 ? 'even' : 'odd'}>
              <td>{page * pageSize + index + 1}</td>
              <td>{DOMPurify.sanitize(dg.tenKhachHang)}</td>
              <td>{DOMPurify.sanitize(dg.tenSuKien)}</td>
              <td>
                {DOMPurify.sanitize(String(dg.loaiDanhGia))}/5{' '}
                <span style={{ color: '#f5c518' }}>★</span>
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleDetailClick(dg.maDanhGia)}>Chi tiết</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(dg.maDanhGia)}>Xóa</button>
              </td>
            </tr>
          ))}
          {danhGias.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '10px' }}>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="table-footer">
        <span>
          Trang {page + 1} / {totalPages} | Hiển thị {danhGias.length} / {totalElements}
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
        <div className="modal-overlay">
            <div className="modal-content fade-in">
            <h2>Chi tiết đánh giá</h2>

            {loadingDetail ? (
                <p>Đang tải...</p>
            ) : detailError ? (
                <p className="error-text">{detailError}</p>
            ) : selectedDanhGia ? (
                <div className="modal-details">
                <p><strong>Tên khách hàng:</strong> {DOMPurify.sanitize(selectedDanhGia.tenKhachHang)}</p>
                <p><strong>Tên sự kiện:</strong> {DOMPurify.sanitize(selectedDanhGia.tenSuKien)}</p>
                <p><strong>Số sao:</strong> {DOMPurify.sanitize(String(selectedDanhGia.loaiDanhGia))}/5 ⭐</p>
                <p><strong>Bình luận:</strong> {DOMPurify.sanitize(selectedDanhGia.binhLuan || 'Không có')}</p>
                <p><strong>Ngày đánh giá:</strong> {DOMPurify.sanitize(selectedDanhGia.ngayDanhGia)}</p>
                </div>
            ) : (
                <p>Không có dữ liệu</p>
            )}

            <div className="modal-buttons">
                <button className="modal-cancel" onClick={() => setDetailModalOpen(false)}>Đóng</button>
            </div>
            </div>
        </div>
      )}
    </main>
  );
}
