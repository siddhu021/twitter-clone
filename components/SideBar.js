import React from 'react'
import SideBarMenuItems from './SideBarMenuItems'
import Image from 'next/image';

function SideBar() {
  return (
    <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full'>
        {/* Logo */}
        <div className='hoverEffect p-0 hover:bg-blue-100 xl:px-1'>
            <Image height='50' width='50'
            src='https://help.twitter.com/content/dam/help-twitter/brand/logo.png'>
            </Image>
        </div>

        {/* Menu */}
        <div className='mt-4 mb-2 xl:items-start'>
        <div className='hoverEffect menuEffect active'>
            <Image height='30' width='30' src='https://www.shutterstock.com/image-vector/transparent-home-icon-png-vector-260nw-1946628094.jpg'></Image>
            <p className="hidden xl:inline">Home</p>
        </div>

        <div className='hoverEffect menuEffect'>
        <Image height='30' width='30' src='https://cdn.icon-icons.com/icons2/2550/PNG/512/hashtag_icon_152602.png'></Image>
        <p className="hidden xl:inline">Explore</p>
        </div>

        <div className='hoverEffect menuEffect'>
        <Image height='30' width='30' src='https://static.vecteezy.com/system/resources/thumbnails/001/505/138/small/notification-bell-icon-free-vector.jpg'></Image>
        <p className="hidden xl:inline">Notifications</p>
        </div>

        <div className='hoverEffect menuEffect'>
        <Image height='30' width='30' src='https://static.vecteezy.com/system/resources/thumbnails/003/701/476/small/envelope-mail-icon-free-vector.jpg'></Image>
        <p className="hidden xl:inline">Messages</p>
        </div>

        <div className='hoverEffect menuEffect'>
        <Image height='30' width='30' src='https://www.shutterstock.com/image-vector/bookmark-icon-vector-sign-symbol-260nw-1668609910.jpg'></Image>
        <p className="hidden xl:inline">Bookmarks</p>
        </div>

        <div className='hoverEffect menuEffect'>
        <Image height='30' width='30' src='https://cdn-icons-png.flaticon.com/512/1950/1950715.png'></Image>
        <p className="hidden xl:inline">Lists</p>
        </div>

        <div className='hoverEffect menuEffect'>
        <Image height='30' width='30' src='https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'></Image>
        <p className="hidden xl:inline">Profile</p>
        </div>

        <div className='hoverEffect menuEffect'>
        <Image height='30' width='30' src='https://cdn-icons-png.flaticon.com/512/152/152529.png'></Image>
        <p className="hidden xl:inline">More</p>
        </div>
        </div>

        {/* Button */}
        <button className='bg-blue-400 rounded-full text-white w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Tweet</button>

        {/* Mini-Profile */}
        <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
        <img className='rounded-full h-10 w-10 xl:mr-2' src='data:image/jpeg;base64,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'></img>
        <div className='leading-5 hidden xl:inline'>
        <h4 className='font-bold'>Siddhesh Nikam</h4>
        <p>siddheshnikam021</p>
        </div>
        </div>
    </div>
  )
}

export default SideBar;
