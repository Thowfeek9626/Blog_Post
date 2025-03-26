"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCreatePostMutation } from "@/features/postsApi";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Post } from "@/types";


export default function NewPost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const router = useRouter();
  const [createPost] = useCreatePostMutation<Post>();
  
  const handleSubmit = useCallback(async () => {
    setTitleError(false);
    setBodyError(false);
    if (!title.trim() || !body.trim()) {
      setTitleError(!title.trim());
      setBodyError(!body.trim());
      return;
    }
    setLoading(true);
    try {
      await createPost({ title, body, author }).unwrap();
      setOpen(true);
      setTitle("");
      setAuthor("");
      setBody("");
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      setIsError(true);
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  }, [title, body, createPost, router]);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: (theme) => theme.palette.background.paper,
          padding: { xs: 2, sm: 3 },
          borderRadius: 2,
          boxShadow: 2,
          maxWidth: { xs: "90%", sm: "500px" },
          margin: "auto",
          marginTop:'36px',
          marginBottom:'2px'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: (theme) => theme.palette.primary.main,
            textAlign: "center",
          }}
        >
          Create New Post
        </Typography>

        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
          helperText={titleError ? "Title is required" : ""}
        />
        <TextField
          label="Author"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          label="Body"
          fullWidth
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          error={bodyError}
          helperText={bodyError ? "Body is required" : ""}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.secondary.light,
              color: "white",
            },
            width: { xs: "100%", sm: "auto" },
            alignSelf: {xs:"",sm:"start"},
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Container>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert
          severity={isError ? "error" : "success"}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor: (theme) =>
              isError ? theme.palette.error.main : theme.palette.success.main,
          }}
        >
          {isError ? "Could not create Post" : "Post submitted successfully!"}
        </Alert>
      </Snackbar>
    </>
  );
}

