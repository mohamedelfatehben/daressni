
import { timeAgo } from '@/utils/index'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostReplies from './PostReplies';


import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/utils/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/utils/ui/collapsible';
import { Label } from '@/utils/ui/label';
import { Textarea } from '@/utils/ui/textarea';

const PostCard = ({post}) => {


    const[showReplies,setShowReplies]=useState(true)

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
       <img
        src={`data:image/jpg;base64,${post.post.image}`}
       alt="post image" //in this img tag 
       className="post-card_img"
       />
    </div>
    <Collapsible
      open={showReplies}
      onOpenChange={setShowReplies}
      className="w-full space-y-2 bg-white rounded-lg p-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <div className='flex gap-2 w-full items-center'>
          <div className="rounded-md border px-4 py-3 font-mono text-sm w-full">
            {showReplies ? "Hide Replies" : "Show Replies"}
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        </div>
      <CollapsibleContent className="space-y-2">
        <PostReplies repliesArray={post.replies} userId={user.id}/>
      </CollapsibleContent>
    </Collapsible>
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Reply to the Post</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
</div>
  )
}

export default PostCard