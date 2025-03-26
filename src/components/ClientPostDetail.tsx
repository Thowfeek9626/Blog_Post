"use client";

import { useGetPostByIdQuery } from "@/features/postsApi";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import GradientCircularProgress from "@/components/CircularProgress";
import { useRouter } from "next/router";

export default function ClientPostDetail({ initialPost, id }: { initialPost: any; id: number }) {
  const { data: post = initialPost, isLoading, error } = useGetPostByIdQuery(id, { skip: !!initialPost });
  
  const router = useRouter();

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <GradientCircularProgress />
      </Box>
    );

  if (error || !post) return <Typography>Post not found.</Typography>;

  return (
    <Container sx={{ paddingTop: "20px", maxWidth: "800px" }}>
      {/* Back Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button
          color="secondary"
          variant="contained"
          onClick={()=>{router.push("/")}}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            "&:hover": { backgroundColor: (theme) => theme.palette.primary.dark },
          }}
        >
          ← Back
        </Button>
      </Box>

      {/* Post Details */}
      <Paper
        sx={{
          padding: "30px",
          boxShadow: 3,
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          marginBottom: '2px'
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: (theme) => theme.palette.primary.main,
          }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "20px",
            textAlign: "justify",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {post.body}
        </Typography>
        <Typography variant="caption">
          - By <b>{post.author}</b>
        </Typography>
      </Paper>
    </Container>
  );
}
