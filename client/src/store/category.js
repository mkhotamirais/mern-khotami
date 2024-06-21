import { create } from "zustand";
import axios from "axios";
import { url } from "../lib/data";
import { axiosCred } from "./auth";

export const useCategory = create((set) => ({
  editId: null,
  setEditId: (id) => set(() => ({ editId: id })),
  modalDelId: null,
  setModalDelId: (id) => set(() => ({ modalDelId: id })),
  data: [],
  error: null,
  loadPage: false,
  errPage: false,
  loadPost: false,
  loadDelId: null,
  loadUpdateId: null,
  getCategories: () => {
    set({ loadPage: true });
    axios
      .get(`${url}/category`)
      .then((res) => {
        set({ data: res.data.data, loadPage: false });
      })
      .catch((err) => {
        set({ errPage: err?.response?.data?.message, loadPage: false });
      });
  },
  postCategory: async (data) => {
    set({ loadPost: true });
    const res = await axiosCred
      .post(`${url}/category`, data)
      .then((res) => ({ ok: true, message: res?.data?.message }))
      .catch((err) => ({ ok: false, message: err?.response?.data?.message }));
    set({ loadPost: false });
    return res;
  },
  deleteCategory: async (id) => {
    set({ loadDelId: id });
    return await axiosCred
      .delete(`${url}/category/${id}`)
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
    return await axiosCred
      .patch(`${url}/category/${id}`, data)
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
