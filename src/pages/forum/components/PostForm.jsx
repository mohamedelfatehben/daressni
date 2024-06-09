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

// Validation schema
const PostValidation = z.object({
  postTitle: z.string().min(1, { message: "Title is required" }),
  postContent: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 characters" }),
  image: z.custom(() => true), // Adjusted for JavaScript
  group: z.string().min(1, { message: "This field is required" }),
});

const PostForm = ({ post, action }) => {
  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      postTitle: post ? post.postTitle : "",
      postContent: post ? post.postContent : "",
      image: post ? post.image : [],
      group: post ? post.group : "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
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
                <Input placeholder="shadcn" {...field} />
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
          className=""
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>add photo</FormLabel>
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
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end items-center">
          <Button type="button" className="w-24 text-lg">
            Cancel
          </Button>
          <Button type="submit" className="bg-purple-600 w-24 text-lg">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
