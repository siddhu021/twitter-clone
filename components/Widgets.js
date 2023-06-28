import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import News from '@/components/News'
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Widgets({newsResults, randomUser}) {
  const [numberOfNews, setnumberOfNews] = useState(3)
  const [numberOfFollow, setnumberOfFollow] = useState(3)
  return (
    <div className="xl:w-[600px] ml-8 space-y-5">
    <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full bg-red-300 relative">
          <MagnifyingGlassIcon className="h-5 w-5 z-50 text-gray-500"/>
          <input className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100"
           type="text" placeholder="Search Twitter"></input>
        </div> 
    </div> 
    <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
      <h4 className="font-bold text-xl px-4">What's Happening</h4>
      <AnimatePresence>
        {
          newsResults.slice(0,numberOfNews).map((article)=>(
            <motion.div key={article.title} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:1}} transition={{duration:1}}>
              <News key={article.title} article={article} />
            </motion.div>
          ))
        }
      </AnimatePresence>
      <button onClick={()=>setnumberOfNews(numberOfNews+3)} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">See More</button>
    </div>
    
    <div className=" text-gray-700 bg-gray-100 rounded-xl w-[90%] xl:w-[75%] pt-2 space-y-3 sticky top-16">
    <h4 className="font-bold text-xl px-4">Who To Follow</h4>
    <AnimatePresence>
    {
      randomUser?.slice(0,numberOfFollow).map((user)=>(
        <motion.div key={user.login.username} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}}>
        <div key={user.login.username} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out">
        <img className="rounded-full" width="40" src={user.picture.thumbnail}></img>
        <div className="truncate ml-4 leading-5">
          <h4 className="font-bold hover:underline text-[14px] truncate">{user.login.username}</h4>
          <h5 className="text-[13px] text-gray-500 truncate">{user.name.first + " " + user.name.last}</h5>
        </div>
        <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">Follow</button>
        </div>
        </motion.div>
      ))
    }
    </AnimatePresence>
    <button onClick={()=>setnumberOfFollow(numberOfFollow+3)} className="text-blue-300 hover:text-blue-400 pl-4 pb-3">Show More</button>
    </div>
    </div> 
  )
}
 