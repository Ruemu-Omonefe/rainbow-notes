import apiClient from "../apiClient/apiClient";

// Get notes for a specific user
export const getUserNotes = async (id: string) => {
    const res = await apiClient.get(`/api/notes/user/${id}`);
    return res;
};

// Create a new note
export const createNote = (payload: any) => {
  return apiClient.post("api/notes", payload);
};

// Get a note by its ID
export const getNoteById = (id: string) => {
  return apiClient.get(`api/notes/${id}`);
}   