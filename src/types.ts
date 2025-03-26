export interface Post {
    id?: number;
    title: string;
    author: string;
    body: string;
  }

export interface PaginationParams {
    page?: number;
    limit?: number;
  }

  
export interface HomeProps {
  initialPosts: Post[];
}

