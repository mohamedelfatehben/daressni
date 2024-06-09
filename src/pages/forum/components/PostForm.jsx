import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/utils/ui/form";
import { Button } from "@/utils/ui/button";
import { Input } from "@/utils/ui/input";
import { Textarea } from "@/utils/ui/textarea";
import FileUploader from "./FileUploader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/utils/ui/select";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getStudentGroups, getTeacherGroups } from "@/apis/groups";
import { useToast } from "@/utils/ui/use-toast";
import { ToastAction } from "@/utils/ui/toast";
import { createPost } from "@/apis/forum";

// Validation schema
const PostValidation = z.object({
  postTitle: z.string().min(1, { message: "Title is required" }),
  postContent: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 characters" }),
  image: z.string().nonempty({ message: "Image is required" }), // Adjusted for Base64 string
  group: z.string().min(1, { message: "This field is required" }),
});

const PostForm = ({ post, action }) => {
  const { toast } = useToast();
  const user = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (user.userId) {
      if (user.role === "student") {
        getStudentGroups(user.userId).then((res) => {
          if (res.status === 200) {
            setGroups(res.data);
          }
        });
      } else {
        getTeacherGroups(user.userId).then((res) => {
          if (res.status === 200) {
            setGroups(res.data);
          }
        });
      }
    }
  }, [user.userId, user.role]);

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      postTitle: post ? post.postTitle : "",
      postContent: post ? post.postContent : "",
      image: post ? post.image : "",
      group: post ? post.group : "",
    },
  });

  const onSubmit = async (values) => {
    const postDto = {
      postTitle: values.postTitle,
      postContent: values.postContent,
      image: values.image,
      userDto: {
        username: user.name,
        email: user.email,
        idUserGroup: values.group,
      },
    };

    // Check if any fields are empty
    if (!postDto.postTitle || !postDto.postContent || !postDto.image || !postDto.userDto.idUserGroup) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please check the information in the form.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    try {
      const response = await createPost(postDto);
      if (response.status === 201) {
        console.log(response.data);
        toast({
          variant: "success",
          title: "Post created successfully!",
        });
        navigate('/forum'); // Redirect to another page if needed
      }
    } catch (error) {
      console.error("Error adding document:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while adding the document.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 max-w-[1000px]"
      >
        <FormField
          control={form.control}
          name="postTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="Post Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postContent"
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
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add photo</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imgUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Selection group to which the post will be added
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select a group"
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="general">general</SelectItem>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end items-center">
          <Button type="button" className="w-24 text-lg" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button type="submit" className="bg-purple-600 w-24 text-lg">
            {action}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
