import { postIdState, textState } from '@/atom/modalAtom'
import { db, storage } from '@/firebase'
import {ChartBarIcon, ChatBubbleBottomCenterIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, TrashIcon} from '@heroicons/react/20/solid'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useRecoilState } from 'recoil'

function Post({post, id}) {
  const {data:session} = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(textState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [comment, setComment] = useState([]);
  const router = useRouter();

  async function likePost() {
    if(session) {
      if(hasLiked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid));
      }
      else {
        await setDoc(doc(db, 'posts', id, 'likes', session?.user.uid),{
          username: session.user.username,
        });
      }
    }else{
      signIn();
    }
  }

  async function deletePost(){
    if(window.confirm('Are You Sure?')){
      deleteDoc(doc(db, 'posts', id));
      if(post.data().image){
        deleteObject(ref(storage, `posts/${id}/image`))
      }
      router.push('/');
    }
  }

  useEffect(()=>{
    onSnapshot(collection(db, 'posts',id, 'likes'),(snapshot)=>setLikes(snapshot.docs));
  },[db])

  useEffect(()=>{
    setHasLiked(likes.findIndex((like)=> like.id === session?.user.uid) !== -1)
  }, [likes])

  useEffect(()=>{
    onSnapshot(collection(db, 'posts', id, 'comment'),(snapshot)=>{setComment(snapshot.docs)});
  }, [db]);

  return (
    <div className='border-b border-gray-200 p-3'>
      <div className='flex cursor-pointer items-center'>
        <img className='rounded-full h-11 w-11 mr-4 cursor-pointer hover:brightness-95' src={post?.data()?.userImg} alt='img'></img>
      <div className='flex space-x-1 whitespace-nowrap items-center'>
          <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post?.data()?.name}</h4>   
          <span className='text-sm sm:text-[15px]'>@{post?.data()?.username}</span>  
          <span className='text-sm sm:text-[15px] hover:underline'><Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment></span> 
      </div>

          <EllipsisHorizontalIcon className='h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 ml-[150px]'/>
      </div>

      <div>
        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{post?.data()?.text}</p>
      </div>

      <div>
        <img className='rounded-2xl mr-2' src={post?.data()?.image}></img>
      </div>

      <div className='flex justify-between text-gray-500'>
        <div className='flex items-center'>
        <ChatBubbleBottomCenterIcon 
        onClick={()=>{
          if(session){
          setPostId(id);
          setOpen(!open);
          }
          else {
            signIn();
          }
        }} 
        className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'/>
        {
          comment.length > 0 && (
            <span>{comment.length}</span>
          )
        }
        </div>

        {session?.user?.uid === post?.data()?.id && (
          <TrashIcon onClick={deletePost} className='h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'/>
        )}

        <div className='flex items-center'>
        { hasLiked ? (
          <HeartIcon onClick={likePost} className='h-9 hoverEffect p-2 hover:text-red-600 text-red-600 hover:bg-red-100'/>
        ) : (
          <HeartIcon onClick={likePost} className='h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'/>
        )}
        { likes.length > 0 && <span className={`${hasLiked && 'text-red-600'} text-sm`}>{likes.length}</span>}
        </div>

        <ShareIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'/>

        <ChartBarIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'/>
      </div>
    </div>
  )
}

export default Post
