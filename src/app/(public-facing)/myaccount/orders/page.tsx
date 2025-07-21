'use client';

import { useEffect, useState } from 'react';
import '@/public/css/style.css';
import '@/public/css/order.css';

interface HoaDon {
  maHoaDon: string;
  trangThaiHoaDon: string;
  tongTien: number;
  thoiGianThanhCong: string;
  phuongThucThanhToan: string;
  tenKhachHang: string;
  tenSuKien: string;
}

interface ApiResponse {
  content: HoaDon[];
  totalPages: number;
  number: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<HoaDon[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrders = async (page: number) => {
    try {
      const res = await fetch(`http://localhost:5555/api/hoadon/get/all?page=${page}&size=5`, {
        credentials: 'include',
      });
      const data: ApiResponse = await res.json();
      setOrders(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Error fetching orders', err);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const toggleDropdown = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <section className="orders-container">
      <h2 className="orders-title">Hóa đơn của tôi</h2>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.maHoaDon} className="order-card">
            <button
              className="order-header"
              onClick={() => toggleDropdown(order.maHoaDon)}
            >
              <div className="order-summary">
                <div className="order-title">{order.tenSuKien}</div>
                <div className="order-info">
                  Tổng tiền: {order.tongTien.toLocaleString()} VND
                </div>
                <span className={`badge ${
                order.trangThaiHoaDon === 'Chưa thanh toán'
                    ? 'chua-thanh-toan'
                    : order.trangThaiHoaDon === 'Đã thanh toán'
                    ? 'da-thanh-toan'
                    : 'da-huy'
                }`}>
                {order.trangThaiHoaDon}
                </span>
              </div>
              <div className="order-toggle">{expanded === order.maHoaDon ? '▲' : '▼'}</div>
            </button>

            {expanded === order.maHoaDon && (
              <div className="order-details">
                <p>Placeholder</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
        >
            Trang trước
        </button>

        <span className="current-page">
            Trang {page + 1} / {totalPages}
        </span>

        <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
        >
            Trang sau
        </button>
    </div>

    </section>
  );
}
