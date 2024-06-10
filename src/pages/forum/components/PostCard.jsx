import { timeAgo } from '@/utils/index';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostReplies from './PostReplies';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/utils/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/utils/ui/collapsible';
import { Label } from '@/utils/ui/label';
import { Textarea } from '@/utils/ui/textarea';
import { useForm, Controller } from 'react-hook-form';
import { createReply, deletePost as deletePostApi } from '@/apis/forum'; // Import the deletePost API function
import { toast } from 'sonner';

const PostCard = ({ post }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const user = useSelector((state) => state.authReducer);
  const { idGrp } = useParams();
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      replyContent: '',
    },
  });

  const timeToBeCalculated = post.updatedAt == null ? post.createdAt : post.post.createdAt;

  const onSubmitReply = async (values) => {
    const replyDto = {
      postId: post.post.postId,
      username: user.name,
      email: user.email,
      replyContent: values.replyContent,
    };

    console.log(replyDto);
    try {
      const response = await createReply(replyDto);
      if (response.status === 201) {
        toast.success('Reply added successfully!');
        reset();
        window.location.reload(); // Refresh the page to fetch new replies
      }
    } catch (error) {
      console.error('Error adding reply:', error);
      toast.error('An error occurred while adding the reply.');
    }
  };

  const deletePost = async (postId) => {
    try {
      await deletePostApi(postId);
      toast.success('Post deleted successfully!');
      window.location.reload(); // Refresh the page to fetch the updated list of posts
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('An error occurred while deleting the post.');
    }
  };

  return (
    <div className="post-card max-w-[620px]">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <div>
            <img
              src={'/img/profile-placeholder.svg'}
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

        <div className='flex gap-3 justify-center items-center'>
            <Link to={`/update-post/${post.post.postId}`} className={`${user.name !== post.post.userDto.username ? 'hidden' : '' }`}>
              <img src='/img/edit.svg' alt="edit" width={20} height={20} />
            </Link>
            {user.email === post.post.userDto.email && (
              <div className='cursor-pointer'
                onClick={() =>
                  toast.warning('Would you like to delete the post?', {
                    description: 'This action cannot be undone.',
                    action: {
                      label: 'Confirm',
                      onClick: () => deletePost(post.post.postId),
                    },
                  })
                }
              >
                <img src='/img/delete.svg' alt="delete" width={20} height={20} />
              </div>
            )}
        </div>
      </div>
      <div to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p className='flex-center gap-2 text-light-3'>{post.post.postContent}</p>
          <ul className="flex gap-1 mt-2">
            {/* {post.tags?.map((tag) => (
              <li className="text-light-3" key={tag}>#{tag}</li>
            ))} */}
          </ul>
        </div>
        <img
          src={`data:image/jpg;base64,${post.post.image}`}
          alt="post image"
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
            <div className="rounded-md border px-4 py-3 font-mono text-sm w-full font-bold">
              {showReplies ? 'Hide Replies' : 'Show Replies'}
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent className="space-y-2">
          <PostReplies repliesArray={post.replies} userId={user.id} />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={showComment}
        onOpenChange={setShowComment}
        className="w-full space-y-2 bg-transparent rounded-lg p-2"
      >
        <div className={`flex items-center ${ !showComment ? 'justify-end' : 'justify-between' }  space-x-4 px-4`}>
          <div className='flex gap-2 w-full items-center justify-between mt-5'>
            { !showComment &&<div className="rounded-2xl border px-4 py-3 font-mono text-sm w-full bg-white font-bold">
              {showComment ? 'Hide comment' : 'Show comment'}
            </div>}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <img src="/img/comment.png" alt=""  className='bg-white p-1 rounded-full'/>
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent className="space-y-2">         
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Reply to the Post</Label>
            <form onSubmit={handleSubmit(onSubmitReply)}>
              <Controller
                name="replyContent"
                control={control}
                render={({ field }) => (
                  <Textarea
                    placeholder="Type your message here."
                    id="message"
                    {...field}
                  />
                )}
              />
              <Button type="submit" className="mt-2 bg-purple-600 w-full text-lg">
                Submit Reply
              </Button>
            </form>
          </div>
        </CollapsibleContent>
      </Collapsible>




    </div>
  );
};

export default PostCard;
