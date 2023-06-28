import { db, storage } from '@/firebase';
import {FaceSmileIcon, PhotoIcon, XMarkIcon} from '@heroicons/react/20/solid'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSession, signOut } from 'next-auth/react'
import { useState, useRef } from 'react';

export default function () {
  const { data:session } = useSession();
  const [input, setInput] = useState("");
  const imagePicker = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
   
  const sendPost = async ()=>{
    if(loading) return;
    setLoading(true);

    const docRef = addDoc(collection( db, 'posts'),{
      id:session.user.uid,
      text:input,
      userImg:session.user.image,
      timeStamp:serverTimestamp(),
      name:session.user.name,
      username:session.user.username,
    });
    
    // const imageRef = ref(storage, `posts/${docRef?.id}/image`);
    const imageRef = ref(storage, 'posts/'+(await docRef).id+'/image');
    // const link = 'posts/'+{docRef}+'/image'
    // console.log(link);
    if(selectedFile){
      await uploadString(imageRef, selectedFile, 'data_url').then(async()=>{
        const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, 'posts', (await docRef).id),{
            image:downloadURL
          })
      })
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImageToPost = (e)=> {
    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent)=>{
      setSelectedFile(readerEvent.target.result);
    };
  }

  return (
    <>
      {session && (
        <div className='flex border-b-gray-200 p-3 space-x-3'>
           <img className='rounded-full h-11 w-11 cursor-pointer hover:brightness-95' onClick={signOut}
           src={session?.user?.image}></img>
           <div className='w-full divide-y divide-gray-200'>
              <div className=''>
                  <textarea value={input} onChange={(e)=>setInput(e.target.value)} className='w-full border-none focus-ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700' rows="2" placeholder='Whats Happening?'></textarea>
              </div>
              { selectedFile && 
                <div className='relative'>
              <XMarkIcon className='h-7 text-black absolute cursor-pointer rounded-full border border-white m-2 '
               onClick={()=>{setSelectedFile(null)}}/>
              <img src={selectedFile} className={`${loading && "animate-pulse"}`}></img>
              </div>
              }
              {!loading &&
            <div className='flex justify-between pt-2.5 items-center'>
            <div className='flex'>
            <div onClick={()=>imagePicker.current.click()}>
               <PhotoIcon className='h-10 w-10 hoverEffect p-1.5 mr-3 text-sky-500 bg-sky-100'/>
               <input type='file' ref={imagePicker} hidden onChange={addImageToPost}></input>
            </div>
               <FaceSmileIcon className='h-10 w-10 hoverEffect p-1.5 text-sky-500 bg-sky-100'/>
            </div>
            <button 
            className='bg-blue-400 rounded-full text-white px-4 py-1.5 w-40 h-10 font-bold shadow-md hover:brightness-95 disabled:opacity-50'
            disabled={!input.trim()} onClick={sendPost}>Tweet</button>
            </div>
              }
        </div>
    </div>
      )}
    </>
  )
}
