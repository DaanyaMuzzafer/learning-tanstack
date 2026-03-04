import { fetchPosts } from "../API/api";
import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const FetchRQ = (): JSX.Element => {
  const { data, isPending, isError, error } = useQuery<Post[], Error>({
    queryKey: ["posts"], // similar role to useState cache key
    queryFn: fetchPosts, // similar role to useEffect data fetching
  });

  if (isPending) return <p><i>Loading...</i></p>;

  if (isError)
    return (
      <p>
        <i>
          Something went wrong, Error: {error.message || "Something went wrong"}
        </i>
      </p>
    );

  return (
    <div>
      <ul>
        {data?.map((curElem: Post) => {
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