"use client";
import { DeletePostParams, Post, VotePostParams } from "@/@types/post";
import PostCard from "./Card";
import { useEffect, useState } from "react";
import { PostService } from "@/api/services/post.service";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setMessage, setModal } from "@/redux/reducers/ui/slice";
import PostCardSkeleton from "./CardSkeleton";

type PostCardContainerProps = {
  data: Post[];
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
  hasNextPage?: boolean;
};

const PostCardContainer = ({
  data,
  loadMoreRef,
  hasNextPage,
}: PostCardContainerProps) => {
  const [posts, setPosts] = useState<Post[]>(data);
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const dispatch = useAppDispatch();

  const handleVote = (params: VotePostParams) => {
    if (!accessToken)
      return dispatch(
        setModal({ modal: "loginModal", modalState: { isOpen: true } })
      );

    PostService.vote(params)
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id !== params.id) return post;

            const isSameVote = post.vote === params.type;
            const previous = post.vote;
            const next = isSameVote ? null : params.type;

            const newPost = {
              ...post,
              vote: next,
            };

            if (previous === "like") newPost.votes.likes--;
            if (previous === "dislike") newPost.votes.dislikes--;

            if (next === "like") newPost.votes.likes++;
            if (next === "dislike") newPost.votes.dislikes++;

            return newPost;
          })
        );
      })
      .catch(() => {
        dispatch(setMessage({ text: "ERROR", status: false }));
      });
  };

  const handleDelete = (params: DeletePostParams) => {
    PostService.delete(params)
      .then(async (res) => {
        if (res.status === 200) {
          setPosts((prev) => prev.filter((post) => post.id !== params.id));
          dispatch(setMessage({ text: "Post deleted", status: true }));
        }
      })
      .catch(() => {
        dispatch(setMessage({ text: "Error deleting post", status: false }));
      });
  };

  return (
    <>
      {posts.map((post, index) => (
        <PostCard
          onDelete={handleDelete}
          onVote={handleVote}
          key={index}
          data={post}
        />
      ))}

      {hasNextPage && <div ref={loadMoreRef} style={{ height: "100px" }} />}
    </>
  );
};

export default PostCardContainer;
