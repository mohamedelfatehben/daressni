import React from 'react'

const PostReplies = ({repliesArray}) => {

    const replies = repliesArray.map((reply)=>(
        <div 
        key={reply.replyId}
        className="comment bg-dark-4 shadow-md rounded-md p-4 mb-4">
            <div className="comment-header flex justify-between items-center">
                    <div className='flex items-center gap-5'>
                        <img src={'/img/profile-placeholder.svg' } 
                        alt="profile image"
                        className="rounded-full w-8 lg:h-12" 
                        />
                        <div className='flex flex-col'>
                            <p className="font-semibold text-lg text-light-2">@{reply.replierUsername}</p>
                            <p className="text-sm text-gray-600 pl-5">{reply.replierEmail}</p>
                        </div>
                    </div>
            </div>
            <div className="comment-body mt-3">
            <p>{reply.replyContent}</p>
            </div>
        </div>
    ))

  return (
        <div className='flex w-full flex flex-col gap-1'>
             {replies}
        </div>
  )
}

export default PostReplies