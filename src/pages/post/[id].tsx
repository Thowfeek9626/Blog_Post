import { useRouter } from "next/router";
import { useGetPostByIdQuery } from "@/features/postsApi";
import ClientPostDetail from "@/components/ClientPostDetail";
import GradientCircularProgress from '../../components/CircularProgress'
import { Box } from "@mui/material";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query; // ✅ Get ID from URL
  const postId = Number(id);

  const { data: post, error, isLoading } = useGetPostByIdQuery(postId, {
    skip: isNaN(postId), // Skip query if ID is invalid
  });

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <GradientCircularProgress />
      </Box>
    );
  if (error || !post) return <p>Post not found</p>;

  return <ClientPostDetail initialPost={post} id={postId} />;
}
