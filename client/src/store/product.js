import { create } from "zustand";
import axios from "axios";
import { axiosCred } from "./auth";
import { url } from "../lib/data";

export const useProduct = create((set) => ({
  // paginasi
  currentPage: 1,
  setCurrentPage: (num) => set({ currentPage: num }),
  // lainnya
  view: JSON.parse(localStorage.getItem("productView")) || "card",
  setView: (param) =>
    set(() => {
      const view = param === "table" ? "table" : "card";
      localStorage.setItem("productView", JSON.stringify(view));
      return { view };
    }),
  data: [],
  singleData: null,
  countData: null,
  loadPage: false,
  errPage: false,
  loadPost: false,
  loadDel: false,
  loadUpdate: false,
  getProducts: (queryRes) => {
    set({ loadPage: true });
    axios
      .get(`${url}/product?${queryRes ? queryRes : "limit=2"}`)
      .then((res) => {
        set({ loadPage: false, data: res?.data?.data, countData: res?.data?.count });
      })
      .catch((err) => {
        set({ loadPage: false, errPage: err?.response?.data?.message });
      });
  },
  getProductById: (id) => {
    set({ loadPage: true });
    axios
      .get(`${url}/product/${id}`)
      .then((res) => {
        set({ loadPage: false, singleData: res?.data?.data });
      })
      .catch((err) => {
        set({ loadPage: false, errPage: err?.response?.data?.message });
      });
  },
  postProduct: async (data) => {
    set({ loadPost: true });
    return await axiosCred
      .post(`${url}/product`, data)
      .then((res) => {
        set({ loadPost: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadPost: false });
        return { ok: false, message: err?.response?.data?.message };
      });
  },
  deleteProduct: async (id) => {
    set({ loadDel: true });
    return await axiosCred
      .delete(`${url}/product/${id}`)
      .then((res) => {
        set({ loadDel: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadDel: false });
        return { ok: false, message: err?.response?.data?.message };
      });
  },
  updateProduct: async (id, data) => {
    set({ loadUpdate: true });
    return await axiosCred
      .patch(`${url}/product/${id}`, data)
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
