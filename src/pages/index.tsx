import { GetStaticProps } from 'next';
import ClientPosts from "@/components/ClientPosts";
import { HomeProps } from '@/types';

async function getPosts(page = 1, limit = 4) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export const metadata = {
  title: "Blog Dashboard",
  description: "The dashboard will display a list of blog posts",
};

export const getStaticProps: GetStaticProps = async () => {
  const page = 1;
  const limit = 4;
  const initialPosts = await getPosts(page, limit);

  return {
    props: { initialPosts },
    revalidate: 10, 
  };
};


const Home: React.FC<HomeProps> = ({ initialPosts }) => {
  return <ClientPosts initialPosts={initialPosts} />;
};

export default Home;
