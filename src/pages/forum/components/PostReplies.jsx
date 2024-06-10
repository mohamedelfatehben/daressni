
import React from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { deleteReply as deleteReplyApi } from '@/apis/forum';

const PostReplies = ({repliesArray}) => {

    const user = useSelector((state) => state.authReducer);

    const deleteReply = async (replyId) => {
        try {
          await deleteReplyApi(replyId);
          toast.success("Reply deleted successfully");
          window.location.reload(); // Refresh the page to fetch new replies
        } catch (error) {
          toast.error("Error deleting reply");
          console.error("Error deleting reply:", error);
        }
      };

    

    const replies = repliesArray.map((reply)=>(
        <div 
        key={reply.replyId}
        className="comment bg-dark-4 shadow-md rounded-md p-4 mb-4">
            <div className="comment-header flex justify-between items-center">
                    <div className='flex items-center gap-5 w-full'>
                        <img src={'/img/profile-placeholder.svg' } 
                        alt="profile image"
                        className="rounded-full w-8 lg:h-12" 
                        />
                        <div className='flex flex-col'>
                            <p className="font-semibold text-lg text-light-2">@{reply.replierUsername}</p>
                            <p className="text-sm text-gray-600 pl-5">{reply.replierEmail}</p>
                        </div>
                        <div className='w-full relative h-[30px]'>
                                <img src='/img/edit.svg' 
                                className='absolute right-3 cursor-pointer' 
                                alt="edit" width={20} height={20} />
                        </div>
                    </div>
            </div>
            <div className="comment-body mt-3 flex justify-between items-center">
            <p>{reply.replyContent}</p>
            {   user.email === reply.replierEmail &&  
                        
                <div       onClick={() =>
                    toast.warning("Would you like to delete the reply", {
                    //   description: "I see want to delete your reply",
                      action: {
                        label: "confirm",
                        onClick: () => deleteReply(reply.replyId),
                      },
                    })
                  }>
                 <img src="/img/delete.svg" alt="" className='rounded-full w-7 bg-white p-1 cursor-pointer' />
                </div>
                }
            </div>
        </div>
    ))

  return (
        <div className='flex w-full  flex-col gap-1'>
             {replies}
        </div>
  )
}

export default PostReplies