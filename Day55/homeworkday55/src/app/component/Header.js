import Link from "next/link";
import React from "react";

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <span>S</span>
                <div>Travel</div>
            </div>
            <div className="link-access">
                <Link href="home">Trang Chủ</Link>
                <Link href="book">Đặt Lịch</Link>
                <Link href="packages">Ưu Đãi</Link>
                <Link href="services">Dịch Vụ</Link>
                <Link href="gallery">Thư Viện</Link>
                <Link href="review">Đánh Giá</Link>
                <Link href="contact">Liên Hệ</Link>
            </div>
            <div className="action">
                <div className="mode"></div>
                <div className="search"></div>
                <div className="đk-đn"></div>
            </div>
        </div>
    );
}

export default Header;
