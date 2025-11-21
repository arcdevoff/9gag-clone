import { UploadResponse, UploadValues } from "@/@types/upload";
import axios from "../axios";

export const UploadService = {
  async upload({ file }: UploadValues) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post<UploadResponse>("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
