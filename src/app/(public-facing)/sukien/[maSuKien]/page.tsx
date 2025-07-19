'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/public/css/style.css';
import '@/public/css/event-detail.css';

interface SuKien {
  maSuKien: number;
  tenSuKien: string;
  moTa: string;
  anhSuKien: string;
  diaDiem: string;
  trangThaiSuKien: string;
  phiThamGia: number;
  luongChoNgoi: number;
  ngayBatDau: string;
  ngayKetThuc: string;
}

export default function EventDetailPage() {
  const router = useRouter();
  const maSuKien = typeof window !== 'undefined'
    ? window.location.pathname.split('/').pop()
    : '';

  const [event, setEvent] = useState<SuKien | null>(null);

  useEffect(() => {
    if (!maSuKien) return;

    fetch(`http://localhost:5555/api/sukien/get/${maSuKien}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error('Failed to fetch event:', err));
  }, [maSuKien]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('vi-VN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const formatCurrency = (amount: number) =>
    amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

  if (!event) return <main><div className="event-detail-container">Đang tải sự kiện...</div></main>;

  return (
    <main>
      <div className="event-detail-container">
        <a href="/" className="back-link">← Quay lại</a>

        <div className="event-detail-wrapper">
          <div className="event-image">
            <img id="event-img" src={event.anhSuKien} alt="Ảnh sự kiện" />
          </div>
          <div className="event-info">
            <h1 id="event-title">{event.tenSuKien}</h1>
            <p><strong>Bắt đầu:</strong> <span id="event-start">{formatDate(event.ngayBatDau)}</span></p>
            <p><strong>Kết thúc:</strong> <span id="event-end">{formatDate(event.ngayKetThuc)}</span></p>
            <p><strong>Địa điểm:</strong> <span id="event-location">{event.diaDiem}</span></p>
            <p><strong>Giá vé:</strong> <span id="event-price">{formatCurrency(event.phiThamGia)}</span></p>
            <p><strong>Mô tả:</strong></p>
            <p id="event-description">{event.moTa}</p>
            <p><strong>Ghế ngồi:</strong> <span id="event-seats">{event.luongChoNgoi}</span></p>
            <p><strong>Trạng thái:</strong> <span id="event-status">{event.trangThaiSuKien}</span></p>
            <a href={`/dangky/${event.maSuKien}`} id="register-link" className="btn-register">Đăng ký</a>
          </div>
        </div>

        <div id="review-section" style={{ display: 'none', marginTop: '40px' }}>
          <h3>Đánh giá sự kiện</h3>
          <form id="review-form">
            <label>Chọn số sao:</label><br />
            <select id="review-stars" required>
              <option value="">-- Chọn --</option>
              <option value="5">5 - Tuyệt vời</option>
              <option value="4">4 - Tốt</option>
              <option value="3">3 - Bình thường</option>
              <option value="2">2 - Tạm được</option>
              <option value="1">1 - Tệ</option>
            </select><br /><br />
            <label>Đánh giá chi tiết:</label><br />
            <textarea id="review-content" rows={4} required></textarea><br /><br />
            <button type="submit">Gửi đánh giá</button>
          </form>
          <div id="review-list" style={{ marginTop: '20px' }}>
            <h4>Đánh giá từ người khác:</h4>
          </div>
        </div>
      </div>
    </main>
  );
}
