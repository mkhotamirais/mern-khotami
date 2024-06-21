import { create } from "zustand";
const url = "http://localhost:5000/api/khotami-mern/tag";
import axios from "axios";

export const useTag = create((set) => ({
  editId: null,
  setEditId: (id) => set(() => ({ editId: id })),
  modalDelId: null,
  setModalDelId: (id) => set(() => ({ modalDelId: id })),
  data: [],
  error: null,
  loadGet: false,
  loadPost: false,
  loadDelId: null,
  loadUpdateId: null,
  getTags: () => {
    set({ loadGet: true });
    axios
      .get(url)
      .then((res) => {
        set({ data: res.data.data, loadGet: false });
      })
      .catch((err) => {
        set({ errorGet: err?.response?.data?.message, loadGet: false });
      });
  },
  postTag: async (data) => {
    set({ loadPost: true });
    const res = await axios
      .post(url, data)
      .then((res) => ({ ok: true, message: res?.data?.message }))
      .catch((err) => ({ ok: false, message: err?.response?.data?.message }));
    set({ loadPost: false });
    return res;
  },
  deleteTag: (id) => {
    set({ loadDelId: id });
    return axios
      .delete(`${url}/${id}`)
      .then((res) => {
        set({ loadDelId: null });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadDelId: null });
        return { ok: false, message: err?.response.data.message };
      });
  },
  updateTag: (id, data) => {
    set({ loadUpdateId: id });
    return axios
      .patch(`${url}/${id}`, data)
      .then((res) => {
        set({ loadUpdateId: null });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadUpdateId: null });
        return { ok: false, message: err?.response.data.message };
      });
  },
}));
