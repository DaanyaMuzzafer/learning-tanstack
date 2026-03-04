import React from "react";
import { fetchPosts } from "../API/api";
import type { JSX } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const FetchOld = (): JSX.Element => {
  // had to manage three diff states for one api call
  const [post, setPost] = React.useState<Post[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  const getPostsData = async (): Promise<void> => {
    try {
      const data = await fetchPosts();
      setPost(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  React.useEffect(() => {
    getPostsData();
  }, []);

  if (isLoading) return <p><i>Loading...</i></p>;
  if (isError) return <p><i>Something went wrong</i></p>;

  return (
    <div>
      <ul>
        {post.map((curElem: Post) => {
          const { id, title, body } = curElem;

          return (
            <li key={id}>
              <p>{id}</p>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};