import axios from "axios";
import type { RegisterData, LoginData } from "../types/auth.types";
import { CreatePostPayload } from "../types/post.types";

const API = process.env.NEXT_PUBLIC_API_URL;
const config = {
  withCredentials: true // 
};

export const registerUser = (data: RegisterData) => {
  return axios.post(`${API}/auth/register`, data, config );
};

export const loginUser = (data: LoginData) => {
  return axios.post(`${API}/auth/login`, data, config);
};

export const adminLogin = (data: LoginData) => {
  return axios.post(`${API}/auth/admin/login`, data, config);
};

// posts handler
export const createPost = async (data: CreatePostPayload) => {
  return axios.post(`${API}/posts`, data, config );
};

export const getPosts = async () => {
  const response =
    await axios.get(
      `${API}/posts`
    );

  return response.data;
};

export const getPost = async (
  id: string
) => {
  const response =
    await axios.get(
      `${API}/posts/${id}`
    );

  return response.data;
};

export const updatePost = async (
  id: string,
  data: CreatePostPayload
) => {
  const response = await axios.put(
    `${API}/posts/${id}`,
    data,
    config
  );

  return response.data;
};

export const deletePost = async (
  id: string
) => {
  const response =
    await axios.delete(
      `${API}/posts/${id}`,
      config
    );

  return response.data;
};

// getting posts by slug
export const getPostBySlug = async (slug: string) => {
  console.log("API VALUE:", API);
  console.log("FULL URL:", `${API}/posts/slug/${slug}`);

  const response = await axios.get(
    `${API}/posts/slug/${slug}`
  );

  return response.data;
};