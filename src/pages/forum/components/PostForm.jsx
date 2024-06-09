import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";








import {  useNavigate } from "react-router-dom";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/utils/ui/form";
import { Button } from "@/utils/ui/button";
import { Input } from "@/utils/ui/input";
import { Textarea } from "@/utils/ui/textarea";
import FileUploader from "./FileUploader";

// Validation schema
const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 characters" }),
  file: z.custom(() => true), // Adjusted for JavaScript
  location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});

const PostForm = ({ post, action }) => {
  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : ""
    },
  });


  // const navigate = useNavigate();

  const onSubmit = async (values) => {
    // if (post && action === "Update") {
    //   const updatedPost = await updatePost({
    //     ...values,
    //     postId: post.$id,
    //     imageId: post.imgId,
    //     imageUrl: post.imgUrl
    //   });

    //   if (!updatedPost) {
    //     toast({
    //       variant: "destructive",
    //       title: "Please try again",
    //     });
    //   }

    //   return navigate(`/posts/${post.$id}`);
    // }

    // const newPost = await createPost({
    //   ...values,
    //   userId: user.id,
    // });

    // if (!newPost) {
    //   toast({
    //     variant: "destructive",
    //     title: "Please try again!",
    //   });
    // }

    // navigate('/');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 max-w-[1000px] ">
      <FormField
        control={form.control}
        name="post title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Post Title</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="post title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Post content</FormLabel>
            <FormControl>
            <Textarea placeholder="Type your message here." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        className=""
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel>add photo</FormLabel>
            <FormControl>
            <FileUploader fieldChange={field.onChange} mediaUrl={post?.imgUrl}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </form>
    </Form>
  );
};

export default PostForm;
