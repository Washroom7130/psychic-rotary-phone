"use client";

import Script from "next/script";
import Link from "next/link";
import '@/public/css/style.css';
import '@/public/css/index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
  faMoneyBillWave,
  faUser,
  faLock,
  faReceipt,
  faSignOutAlt,
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
  faTiktok,
} from "@/lib/icons";
import { useUser } from "@/context/UserContext";

export default function Footer() {

    const { user } = useUser();

  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-columns">
            <div className="footer-column">
              <h3>Thông tin liên hệ</h3>
              <ul>
                <li><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Đường ABC, Quận XYZ, Thành phố HCM</li>
                <li><FontAwesomeIcon icon={faPhone} /> 0123.456.789</li>
                <li><FontAwesomeIcon icon={faEnvelope} /> info@shopbanhang.com</li>
                <li><FontAwesomeIcon icon={faClock} /> 8h00 - 21h00 các ngày trong tuần</li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Danh mục sự kiện</h3>
              <div id="footer-categories" className="footer-categories">
                <div className="loading">Đang tải danh mục...</div>
              </div>
            </div>

            {user && (
                <div className="footer-column">
                <h3>Thông tin của bạn</h3>
                <ul className="account-footer-list">
                  <li><Link href="/my-account"><FontAwesomeIcon icon={faUser} /> Thông tin cá nhân</Link></li>
                  <li><Link href="/my-account"><FontAwesomeIcon icon={faLock} /> Đổi mật khẩu</Link></li>
                  <li><Link href="/my-account"><FontAwesomeIcon icon={faReceipt} /> Lịch sử giao dịch</Link></li>
                  <li><Link href="/my-account"><FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất</Link></li>
                </ul>
              </div>
            )}

            <div className="footer-column">
              <h3>Giới thiệu</h3>
              <p>
                Trung tâm Sự Kiện mang đến những chương trình đa dạng,
                hấp dẫn và chất lượng cao, đáp ứng nhu cầu giải trí, học tập và kết nối cộng đồng.
              </p>
            </div>

            <div className="footer-column">
              <h3>Kết nối với chúng tôi</h3>
              <div className="social-links">
                <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
                <a href="#"><FontAwesomeIcon icon={faTiktok} /></a>
              </div>
              <div className="payment-methods">
                <h4>Phương thức thanh toán</h4>
                <div className="payment-icons">
                  <FontAwesomeIcon icon={faCcVisa} />
                  <FontAwesomeIcon icon={faCcMastercard} />
                  <FontAwesomeIcon icon={faCcPaypal} />
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                </div>
              </div>
            </div>
          </div>

          <div className="copyright">
            <p>© 2025 Shop Bán Hàng. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>

      {/* Include third-party scripts */}
      <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" strategy="lazyOnload" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js" strategy="lazyOnload" />
    </>
  );
}
