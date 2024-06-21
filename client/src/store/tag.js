import { create } from "zustand";
import axios from "axios";
import { url } from "../lib/data";

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
      .get(`${url}/tag`)
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
      .post(`${url}/tag`, data)
      .then((res) => ({ ok: true, message: res?.data?.message }))
      .catch((err) => ({ ok: false, message: err?.response?.data?.message }));
    set({ loadPost: false });
    return res;
  },
  deleteTag: async (id) => {
    set({ loadDelId: id });
    return await axios
      .delete(`${url}/tag/${id}`)
      .then((res) => {
        set({ loadDelId: null });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadDelId: null });
        return { ok: false, message: err?.response.data.message };
      });
  },
  updateTag: async (id, data) => {
    set({ loadUpdateId: id });
    return await axios
      .patch(`${url}/tag/${id}`, data)
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
