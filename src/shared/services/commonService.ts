import apiClient from "../apiClient/apiClient";

export const getUserNotes = async (id: string) => {
    const res = await apiClient.get(`/api/notes/user/${id}`);
    return res;
};

export const createNote = (payload: any) => {
  return apiClient.post("api/notes", payload);
};