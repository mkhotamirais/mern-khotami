import { create } from "zustand";
const url = "http://localhost:5000/api/khotami-mern/category";
import axios from "axios";

export const useCategory = create((set) => ({
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
  getCategories: () => {
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
  postCategory: async (data) => {
    set({ loadPost: true });
    const res = await axios
      .post(url, data)
      .then((res) => ({ ok: true, message: res?.data?.message }))
      .catch((err) => ({ ok: false, message: err?.response?.data?.message }));
    set({ loadPost: false });
    return res;
  },
  deleteCategory: async (id) => {
    set({ loadDelId: id });
    return await axios
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
  updateCategory: async (id, data) => {
    set({ loadUpdateId: id });
    return await axios
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
