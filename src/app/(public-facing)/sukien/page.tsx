'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import '@/public/css/index.css';
import '@/public/css/style.css';
import '@/public/css/account.css';
import '@/public/css/event.css';
import { useRouter, useSearchParams } from 'next/navigation';

interface DanhMuc {
  maDanhMuc: number;
  tenDanhMuc: string;
}

interface Event {
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
    maDanhMuc: number | null;
    rating: number;
  }

export default function SukienPage() {
  const [categories, setCategories] = useState<DanhMuc[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") ?? "";
  const categoryParam = searchParams.get("category") ?? "all";
  const [errorMsg, setErrorMsg] = useState('');
  const [maxPrice, setMaxPrice] = useState(5000000);

  useEffect(() => {
    fetch('http://localhost:5555/api/danhmucsukien/get/all?size=100', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setCategories(data.content || []);
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("size", "12");
        params.set("trangThai", "Còn chỗ,Hết chỗ,Hết hạn đăng ký,Đang diễn ra");
  
        if (searchParam) params.set("search", searchParam);
        if (categoryParam && categoryParam !== "all") {
          params.set("maDanhMuc", categoryParam);
        }
  
        const res = await fetch(
          `http://localhost:5555/api/sukien/get/all?${params.toString()}`,
          {
            credentials: "include",
          }
        );
  
        const data = await res.json();
  
        if (res.ok) {
          if (data.content.length === 0) {
            setErrorMsg("Không tìm thấy kết quả phù hợp");
          } else {
            setEvents(data.content);
            setTotalPages(data.totalPages);
            setErrorMsg(""); // clear error
          }
        } else {
          setEvents([]);
          setTotalPages(0);
          setErrorMsg("Không tìm thấy kết quả phù hợp");
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]);
        setTotalPages(0);
        setErrorMsg("Không tìm thấy kết quả phù hợp");
      }
    };
  
    fetchEvents();
  }, [page, searchParam, categoryParam]);  

  return (
    <main>
      <section className="event-listing-container">
        <div className="event-flex">
          <aside className="event-sidebar">
            <h3>Danh mục</h3>
            <ul className="event-categories">
              <li>
                <Link href="/sukien?category=all" data-category="all">
                  Tất cả
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.maDanhMuc}>
                  <Link
                    href={`/sukien?category=${cat.maDanhMuc}`}
                    data-category={cat.maDanhMuc}
                  >
                    {cat.tenDanhMuc}
                  </Link>
                </li>
              ))}
            </ul>

            {/* <h3>Lọc theo giá</h3>
            <input type="range" id="priceRange" min="0" max="5000000" step="50000" />
            <p>
              Giá tối đa: <span id="priceValue">5.000.000₫</span>
            </p> */} {/*May revert back this later*/}
          </aside>

          <section className="event-grid" id="eventGrid">
  {errorMsg ? (
    <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
      {errorMsg}
    </p>
  ) : (events.map(event => (
    <div className="event-card" key={event.maSuKien}>
      <div className="event-image">
        <img id="event-img" src={event.anhSuKien === null ? 
              'https://cdn5.vectorstock.com/i/1000x1000/74/69/upcoming-events-neon-sign-on-brick-wall-background-vector-37057469.jpg' : 
              `http://localhost:5555/api/sukien/get${event.anhSuKien}`} alt="Ảnh sự kiện" />
      </div>
      <div className="event-info">
        <div className="event-meta">
          <span>
            <i className="fas fa-calendar-alt"></i>{' '}
            {new Date(event.ngayBatDau).toLocaleString('vi-VN')}
          </span>
          <br />
          <span>
            <i className="fas fa-calendar-check"></i>{' '}
            {new Date(event.ngayKetThuc).toLocaleString('vi-VN')}
          </span>
        </div>
        <h3 className="event-title">{event.tenSuKien}</h3>
        <p className="event-location">
          <i className="fas fa-map-marker-alt"></i> {event.diaDiem}
        </p>
        <div className="event-footer">
          <span className="event-price">
            {parseInt(event.phiThamGia.toString()).toLocaleString('vi-VN')}₫
          </span>
          <Link href={`/sukien/${event.maSuKien}`} className="btn-detail">
            Chi tiết
          </Link>
          <Link href={`/sukien/${event.maSuKien}`} className="btn-register">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  )))}
</section>

        </div>
        <div className="pagination">
    <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>
      Trang trước
    </button>
    <span>
      Trang {page + 1} / {totalPages}
    </span>
    <button disabled={page + 1 >= totalPages} onClick={() => setPage(p => p + 1)}>
      Trang sau
    </button>
  </div>
      </section>
      
    </main>
  );
}
