import SideBar from '@/components/SideBar'
import Widgets from '@/components/Widgets'
import CommentsModal from '@/components/CommentsModal'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import Post from '@/components/Post'
import { db } from '@/firebase'
import Comment from '@/components/Comment'

export default function CommentPage({newsResults, randomUser, }) {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(()=>{
    onSnapshot(doc(db, 'posts', id),(snapshot)=>{setPost(snapshot)});
  }, [db, id]);

  useEffect(()=>{
    onSnapshot(query(collection(db, 'posts', id, 'comment'),orderBy('timeStamp', 'desc')), (snapshot)=>setComments(snapshot.docs))
  },[db, id])

  return (
      <main className='flex min-h-screen mx-auto'>
        {/* SideBar */}
          <SideBar></SideBar>

        {/* Home/Feed */}
       
        <div className='xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
          <div className='flex py-2 px-3 sticky top-0 z-50 bg-white border-b-gray-200 items-center space-x-2'>
          <div className='hoverEffect' 
          onClick={()=>{
            router.push('/')
          }}>
          <ArrowLeftIcon className='h-5' 
          />
          </div>
          <h2 className='text-lg cursor-pointer font-bold sm:text-xl'>Tweet</h2>
          </div>
          <Post id={id} post={post}></Post>
          {comments.length > 0 && (
            <div>
            {
            comments.map((comment)=>{
              <Comment key={comment.id} id={comment.id} comment={comment?.data()}/>
            })
          }
          </div>
          )}
          </div>
          
          
        {/* Widgets */}
        <div>
          <Widgets newsResults={newsResults.articles} randomUser={randomUser.results} />
        </div>

        {/* Modal */}
        <CommentsModal />
      </main>
  )
}
// https://saurav.tech/NewsAPI/top-headlines/category/health/in.json

export async function getServerSideProps() {
  const newsResults = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json').then((res)=>res.json());
  const randomUser = await fetch('https://randomuser.me/api/?results=5000&inc=name,login,picture').then((res)=>res.json());
  return{
    props:{
      newsResults,
      randomUser,
    }
  }
}