import { useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { Post } from '../types';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [loading, setLoading] = useState(false);

  const handleReadMoreClick = () => {
    setLoading(true);
  };

  return (
<Card
  sx={{
    mb: 2,
    borderRadius: 2,
    boxShadow: 3,
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
    "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
    cursor: "pointer",
    backgroundColor: (theme) => theme.palette.background.paper,
  }}
>
  <CardContent>
    <Typography
      variant="h5"
      sx={{
        fontWeight: "bold",
        color: (theme) => theme.palette.primary.main,
        letterSpacing: 0.5,
        mb: 1,
      }}
    >
      {post.title}
    </Typography>

    <Typography
      variant="body1"
      sx={{
        color: (theme) => theme.palette.text.primary,
        mb: 1,
        lineHeight: 1.5,
      }}
    >
      {post.body.slice(0, 100)}...
    </Typography>

    <Typography variant="caption">
      - By <span style={{ fontWeight: "bold", color: "inherit" }}>{post.author}</span>
    </Typography>

    <Box display="flex" justifyContent="flex-end">
      <Link href={`/post/${post.id}`} passHref>
        <Button
          variant="outlined"
          size="small"
          onClick={handleReadMoreClick}
          color="primary" 
          sx={{
            "&:hover": {
              backgroundColor: (theme) => theme.palette.secondary.light,
              color:'white',
              border:'none'
            }
          }}>
          {loading ? "Loading..." : "Read More"}
        </Button>
      </Link>
    </Box>
  </CardContent>
</Card>
  );
};

export default PostCard;
