import React from 'react'
import { app_icon } from '../../Utils/constants';
import './header.css'
function Header() {

    return (
        <div class="topbar sticky">
            <div className="logo">
                <img src={app_icon}></img>
            </div>
            <div id="menu" class="res-menu">
                <button className='btn-top'>
                    <span>Home</span>
                </button>
                <button className='btn-top'>
                    <span>Phim truyền hình</span>
                </button>
                <button className='btn-top'>
                    <span>phim lẻ</span>
                </button>
                <button className='btn-top'>
                    <span>TV show</span>
                </button>
                <button className='btn-top'>
                    <span>Danh sách của tôi</span>
                </button>

            </div>
            <div className='wrap-notif'>
                <div>

                </div>
            </div>
        </div >

    )
}


export default Header;