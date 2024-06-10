
import { timeAgo } from '@/utils/index'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PostCard = ({post}) => {


    const[showReplies,setShowReplies]=useState(false)

    const user = useSelector((state) => state.authReducer);

    

   const timeToBeCalculated=post.updatedAt == null ? post.createdAt : post.post.createdAt 

  return (
    <div className="post-card max-w-[400px]">
    <div className="flex-between">
        <div className="flex items-center gap-3">
            <div>
                   <img src={'/img/profile-placeholder.svg' } 
                   alt="profile image"
                   className="rounded-full w-12 lg:h-12" 
                   />
            </div>
            <div className="flex flex-col ">
                  <p className="base-medium lg:body-bold text-light-1">@{post.post.userDto.username}</p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">{timeAgo(timeToBeCalculated)}</p>
                    -
                    <p className="subtle-semibold lg:small-regular">{post.post.postTitle}</p>
                  </div>
            </div>
        </div>

          <Link to={`/update-post/${post.post.postId}`} className={`${user.name !== post.post.userDto.username ? 'hidden' : '' }`}>
            <img src='/img/edit.svg' alt="edit" width={20} height={20} />
          </Link>
    </div>
    <div to={`/posts/${post.$id}`}>
       <div className="small-medium lg:base-medium py-5">
          <p className='flex-center gap-2 text-light-3'>{post.post.postContent}</p>
          <ul className="flex gap-1 mt-2">
            {/* {post.tags?.map((tag:string)=>(
                <li className="text-light-3" key={tag}>#{tag}</li>
            ))} */}
          </ul>
       </div>
       <img src={post.imgUrl || '/assets/icons/profile-placeholder.svg'} alt="post image" 
       className="post-card_img"
       />
    </div>
    {showReplies && <PostReplies post={post} userId={user.id}/>}
</div>
  )
}

export default PostCard