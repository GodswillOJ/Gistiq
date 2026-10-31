import axios from "axios";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    "/api/uploads",
    formData
  );

  return response.data.imageUrl;
};