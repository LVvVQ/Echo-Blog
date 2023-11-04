import { cn } from "@/lib/utils";
import { postPatchSchema } from "@/lib/validations/post";
import { Post } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { Link } from "react-router-dom";
import { z } from "zod";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { useEffect, useRef } from "react";
import { reqUpdatePost } from "@/api/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";
import "@/styles/editor.css";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import LinkTool from "@editorjs/link";

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">;
}

type FormData = z.infer<typeof postPatchSchema>;

export default function Editor({ post }: EditorProps) {
  const queryClient = useQueryClient();
  const ejInstance = useRef<EditorJS>();
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  });

  const editMutation = useMutation({
    mutationFn: reqUpdatePost,
    onSuccess: () => {
      toast({
        description: "🎉 Your post has been saved.",
      });
    },
    onError: () => {
      toast({
        title: "🙃 Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      console.log("onSettled")
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      data: JSON.parse(post.content as any),
      autofocus: true,
      tools: {
        header: Header,
        linkTool: LinkTool,
        list: List,
        code: Code,
        inlineCode: InlineCode,
        table: Table,
        embed: Embed,
      },
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    ejInstance.current?.render(post.content as any);

    return () => {
      console.log("destroy")
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [post.content]);

  async function onSubmit(data: FormData) {
    console.log(data);
    const blocks = await ejInstance.current?.save();
    console.log(blocks);
    await editMutation.mutateAsync({
      id: post.id,
      title: data.title,
      content: JSON.stringify(blocks).toString(),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              to="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <p className="text-sm text-muted-foreground">
              {post.published ? "Published" : "Draft"}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {editMutation.isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <div id="editorjs" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </div>
    </form>
  );
}
