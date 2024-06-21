import { create } from "zustand";
import { url } from "../lib/data";
import axios from "axios";
import { axiosCred } from "./auth";

export const useKamus = create((set) => ({
  // basic
  q: "",
  setQ: (q) => set({ q }),
  sort: "",
  setSort: (sort) => set({ sort }),
  query: {},
  queryStr: "",
  setQuery: (query) => set((state) => ({ query: { ...state.query, ...query } })),
  setQueryStr: (query) => {
    set(() => {
      const result = Object.entries(query)
        .map((item) => item.join("="))
        .join("&");
      return { queryStr: result };
    });
  },
  // resetAll: () => set({ q: "", category: "", sort: "", tagIds: [], tagIdsStr: "", query: { limit: 2 }, queryStr: "" }),

  // fetch
  data: [],
  singleData: null,
  loadPage: false,
  errPage: false,
  loadPost: false,
  loadUpdate: false,
  loadDel: false,
  getKamuss: (queryRes) => {
    set({ loadPage: true });
    axios
      .get(`${url}/kamus?${queryRes && queryRes}`)
      .then((res) => {
        set({ loadPage: false, data: res?.data?.data, countData: res?.data?.count });
      })
      .catch((err) => {
        set({ loadPage: false, errPage: err?.response?.data?.message });
      });
  },
  getKamusById: (id) => {
    set({ loadPage: true });
    axios
      .get(`${url}/kamus/${id}`)
      .then((res) => {
        set({ loadPage: false, singleData: res?.data?.data });
      })
      .catch((err) => {
        set({ loadPage: false, errPage: err?.response?.data?.message });
      });
  },
  postKamus: async (data) => {
    set({ loadPost: true });
    return await axiosCred
      .post(`${url}/kamus`, data)
      .then((res) => {
        set({ loadPost: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadPost: false });
        return { ok: false, message: err?.response?.data?.message };
      });
  },
  deleteKamus: async (id) => {
    set({ loadDel: true });
    return await axiosCred
      .delete(`${url}/kamus/${id}`)
      .then((res) => {
        set({ loadDel: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadDel: false });
        return { ok: false, message: err?.response?.data?.message };
      });
  },
  updateKamus: async (id, data) => {
    set({ loadUpdate: true });
    return await axiosCred
      .patch(`${url}/kamus/${id}`, data)
      .then((res) => {
        set({ loadUpdate: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadUpdate: false });
        return { ok: false, message: err?.response?.data?.message };
      });
  },
}));
