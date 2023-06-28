import React, { useEffect, useState } from 'react'
import { postIdState, textState } from '../atom/modalAtom';
import {useRecoilState } from 'recoil';
import Modal from 'react-modal';
import { FaceSmileIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { db } from '@/firebase';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import Moment from 'react-moment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Comments() {
  const [open, setOpen] = useRecoilState(textState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});
  const {data:session} = useSession();
  const [input, setInput] = useState("");
  const router = useRouter();

  useEffect(()=>{
    onSnapshot(doc(db, 'posts', postId), (snapshot)=>{
      setPost(snapshot);
    })
  }, [postId, db])

  async function commentPost(){
    await addDoc(collection(db, 'posts', postId, 'comment'), {
      comment: input,
      userImg:session.user.image,
      timeStamp:serverTimestamp(),
      name:session.user.name,
      username:session.user.username,
    });
    setOpen(false);
    setInput('');
    router.push(`/posts/${postId}`);
  }
  return (
    <div>
      {open && (
        <Modal className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-400 shadow-md rounded-xl'
         onRequestClose={()=>{setOpen(false)}}
         isOpen={open}>
          <div className='p-1'>
            <div className='border-b border-gray-200 py-2 px-1.5'>
              <div className='hoverEffect w-9 h-9 items-center flex justify-center'>
                <XMarkIcon onClick={()=>{setOpen(false)}} className='h-5 text-gray-800'></XMarkIcon>
              </div>
            </div>

            <div className='m-1 flex items-center space-x-1 relative mt-3'>
            <span className='w-0.5 h-[92px] z-[-1] left-6 top-11 absolute bg-gray-400'/>

              <img className='rounded-full h-11 w-11 mr-4 cursor-pointer hover:brightness-95' src={post?.data()?.userImg}></img>
              <div className='flex space-x-1 whitespace-nowrap items-center'>
                <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post?.data()?.name}</h4>   
                <span className='text-sm sm:text-[15px]'>@{post?.data()?.username}</span>  
                <span className='text-sm sm:text-[15px] hover:underline'><Moment fromNow>{post?.timestamp?.toDate()}</Moment></span>
            </div>
            </div>
            <p className='text-[15px] sm:text-[16px] ml-16 mb-2 text-gray-500'>{post?.data()?.text}</p>

            <div className=''>
            <div className='flex border-b-gray-200 p-3 space-x-3'>
           <img className='rounded-full h-11 w-11 cursor-pointer hover:brightness-95 mt-10'
           src={session?.user?.image}></img>
           <div className='w-full divide-y divide-gray-200'>
              <div className='mt-5'>
                  <textarea value={input} onChange={(e)=>setInput(e.target.value)} className='w-full border-none focus-ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700'
                   rows="2" placeholder='Tweet Your Reply'></textarea>
              </div>
            </div>
            </div>
            <div className='flex justify-between pt-2.5 items-center mb-2'>
            <div className='flex ml-12'>
            {/* <div onClick={()=>imagePicker.current.click()}> */}
               <PhotoIcon className='h-10 w-10 hoverEffect p-1.5 mr-3 text-sky-500 bg-sky-100'/>
               {/* <input type='file' ref={imagePicker} hidden onChange={addImageToPost}></input> */}
            {/* </div> */}
               <FaceSmileIcon className='h-10 w-10 hoverEffect p-1.5 text-sky-500 bg-sky-100'/>
            </div>
            <button 
            className='bg-blue-400 rounded-full mr-8 text-white px-4 py-1.5 w-40 h-10 font-bold shadow-md hover:brightness-95 disabled:opacity-50'
            disabled={!input.trim()} onClick={commentPost}>Reply</button>
            </div>
            </div>
            <div>
            <div>
          </div>
          </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
