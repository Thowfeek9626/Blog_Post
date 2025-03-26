"use client";

import { useState, useEffect, useRef } from "react";
import { useGetPostsQuery } from "@/features/postsApi";
import { Container, Typography, Box } from "@mui/material";
import PostCard from "@/components/PostCard";
import GradientCircularProgress from "@/components/CircularProgress";

const ClientPosts = ({ initialPosts }: { initialPosts: any[] }) => {
  const [page, setPage] = useState(1);
  const limit = 4;
  const { data, isLoading, error, isFetching } = useGetPostsQuery({ page, limit });
  const [posts, setPosts] = useState(initialPosts);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      appendNewPosts(data);
    }
  }, [data]);

  useEffect(() => {
    const observer = setupIntersectionObserver();
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [isFetching, data]);

  const appendNewPosts = (newData: any[]) => {
    setPosts((prevPosts) => {
      const uniquePosts = newData.filter((post) => !prevPosts.some((p) => p.id === post.id));
      return [...prevPosts, ...uniquePosts];
    });
  };

  const setupIntersectionObserver = () => {
    return new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && data?.length) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );
  };

  if (isLoading && !posts.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <GradientCircularProgress />
      </Box>
    );
  }

  if (error) return <Typography>Error loading posts</Typography>;

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {isFetching && (
        <Box display="flex" justifyContent="center" alignItems="center" my={4}>
          <GradientCircularProgress />
        </Box>
      )}
      <div ref={observerRef} style={{ height: 10, background: "transparent" }} />
    </Container>
  );
};

export default ClientPosts;
