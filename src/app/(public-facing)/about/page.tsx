'use client';

import '@/public/css/style.css';
import '@/public/css/about1.css';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <>
  <section className="hero flex items-center justify-center text-center text-white">
    <div className="container mx-auto px-6 animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Câu Chuyện Của Chúng Tôi
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        Sáng tạo - Chuyên nghiệp - Tận tâm
      </p>
      <a
        href="#about"
        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 inline-block"
      >
        Khám Phá
      </a>
    </div>
  </section>
  {/* About Section */}
  <section id="about" className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600">
            Về Chúng Tôi
          </h2>
          <p className="text-lg mb-6">
            EventPro được thành lập năm 2010 với sứ mệnh mang đến những trải
            nghiệm sự kiện đáng nhớ nhất cho khách hàng.
          </p>
          <p className="mb-6">
            Với hơn 12 năm kinh nghiệm trong ngành tổ chức sự kiện, chúng tôi tự
            hào đã thực hiện thành công hơn 500 sự kiện lớn nhỏ khác nhau, từ
            hội nghị doanh nghiệp, tiệc cưới sang trọng đến các chương trình ra
            mắt sản phẩm.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              500+ Sự kiện
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              50+ Đối tác
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              98% Hài lòng
            </div>
          </div>
          <Link
            href="/li"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 inline-block"
          >
            Liên Hệ Ngay
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/795d8adb-4d50-47d8-8f80-e23ba23ab10f.png"
            alt="Nhóm EventPro đang làm việc tại một sự kiện với khách hàng trong không gian văn phòng hiện đại"
            className="rounded-lg shadow-xl w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
  {/* Team Section */}
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">
          Đội Ngũ Chuyên Gia
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          Đội ngũ giàu kinh nghiệm với niềm đam mê tạo nên những sự kiện hoàn
          hảo
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="team-card bg-white p-6 rounded-lg shadow-md transition duration-300 text-center">
          <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
            <img
              src="https://avatar.iran.liara.run/public/21"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold mb-2">guyn123</h3>
          <p className="text-blue-600 mb-3">Giám Đốc Sáng Tạo</p>
          <p className="text-gray-600">
            12 năm kinh nghiệm tổ chức sự kiện lớn
          </p>
        </div>
        <div className="team-card bg-white p-6 rounded-lg shadow-md transition duration-300 text-center">
          <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
            <img
              src="https://avatar.iran.liara.run/public/13"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold mb-2">anhtrauluoi</h3>
          <p className="text-blue-600 mb-3">Trưởng Phòng Tổ Chức</p>
          <p className="text-gray-600">Chuyên gia logistics sự kiện</p>
        </div>
        <div className="team-card bg-white p-6 rounded-lg shadow-md transition duration-300 text-center">
          <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
            <img
              src="https://avatar.iran.liara.run/public/22"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold mb-2">Washroom7130</h3>
          <p className="text-blue-600 mb-3">Chuyên Gia Thiết Kế</p>
          <p className="text-gray-600">Thiết kế không gian sự kiện độc đáo</p>
        </div>
        <div className="team-card bg-white p-6 rounded-lg shadow-md transition duration-300 text-center">
          <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
            <img
              src="https://avatar.iran.liara.run/public/27"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold mb-2">jotoki3142</h3>
          <p className="text-blue-600 mb-3">Quản Lý Khách Hàng</p>
          <p className="text-gray-600">Chăm sóc khách hàng tận tâm</p>
        </div>
      </div>
    </div>
  </section>
  {/* Values Section */}
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">
          Giá Trị Cốt Lõi
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          Những nguyên tắc làm nên thương hiệu EventPro
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="value-card bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Sáng Tạo</h3>
          <p className="text-gray-600">
            Luôn đổi mới và sáng tạo trong mọi ý tưởng tổ chức sự kiện
          </p>
        </div>
        <div className="value-card bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Chuyên Nghiệp</h3>
          <p className="text-gray-600">
            Quy trình làm việc bài bản với đội ngũ giàu kinh nghiệm
          </p>
        </div>
        <div className="value-card bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Tận Tâm</h3>
          <p className="text-gray-600">
            Đặt khách hàng làm trung tâm trong mọi quyết định
          </p>
        </div>
      </div>
    </div>
  </section>
</>

    );
}