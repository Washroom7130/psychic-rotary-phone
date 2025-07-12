'use client';

import Link from "next/link";
import Image from "next/image";
import '@/public/css/style.css';
import '@/public/css/index.css';
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@/lib/icons";

export default function Header() {

    const { user, setUser } = useUser();
    const router = useRouter();

    function toggleMenu() {
        const menu = document.querySelector('.main-menu');
        if (menu) menu.classList.toggle('open');
    }

    // Determine the correct link based on user role
    let accountLink = '/login'; // default to login if not logged in
    if (user) {
        if (user.vaiTro === 'KhachHang') accountLink = '/account';
        else if (user.vaiTro === 'NhanVien' || user.vaiTro === 'QuanLy') accountLink = '/admin';
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
        <header>
            <div className="container">
                <div className="logo">
                <Link href="/">
                    <Image
                    src="/img/banners/original.png"
                    alt="Logo Shop"
                    width={100}
                    height={50}
                    />
                </Link>
                </div>

                <button
                className="hamburger"
                aria-label="Mở menu"
                onClick={toggleMenu}
                >
                <span></span>
                <span></span>
                <span></span>
                </button>

                <nav className="main-menu">
                <ul>
                    <li><Link href="/">Trang chủ</Link></li>
                    <li><Link href="/event">Sự Kiện</Link></li>
                    <li><Link href="/about1">Giới thiệu</Link></li>
                    <li><Link href="/contact">Liên hệ</Link></li>
                </ul>
                </nav>

                <div className="header-actions">
                <div className="search">
                    <form action="/event" method="GET">
                    <input type="text" name="keyword" placeholder="Tìm kiếm..." />
                    <button type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
                <div className="account">
                    <Link href={accountLink} id="user-icon"><i className="fas fa-user"></i></Link>
                </div>
                {user && (
                    <div className="account" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        <Link href="#" id="user-icon"><FontAwesomeIcon icon={faSignOutAlt} /> Sign out</Link>            
                    </div>
                )}
                </div>
            </div>
        </header>
    );
}