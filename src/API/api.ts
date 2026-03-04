import axios from "axios"

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
})

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await api.get<Post[]>("/posts")
  return res.status === 200 ? res.data : []
}