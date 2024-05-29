import axios from 'axios';

export interface IUploadFileResponse {
  key: React.Key;
  url: string;
}

export const uploadFile: (file: File) => Promise<IUploadFileResponse> = async (
  file: File,
) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post('/api/asset/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export const uploadFiles: (
  files: File[],
) => Promise<IUploadFileResponse[]> = async (files: File[]) => {
  return Promise.all(files.map((file) => uploadFile(file)));
};
