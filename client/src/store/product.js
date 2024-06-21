import { create } from "zustand";
import axios from "axios";
import { axiosCred } from "./auth";
const url = "http://localhost:5000/api/khotami-mern/product";

export const useProduct = create((set) => ({
  view: JSON.parse(localStorage.getItem("productView")) || "card",
  setView: (param) =>
    set(() => {
      const view = param === "table" ? "table" : "card";
      localStorage.setItem("productView", JSON.stringify(view));
      return { view };
    }),
  data: [],
  singleData: null,
  loadPage: false,
  errPage: false,
  loadPost: false,
  loadDel: false,
  loadUpdate: false,
  getProducts: () => {
    set({ loadPage: true });
    axios
      .get(url)
      .then((res) => {
        set({ loadPage: false, data: res?.data?.data });
      })
      .catch((err) => {
        set({ loadPage: false, errPage: err?.response?.data?.message });
      });
  },
  getProductById: (id) => {
    set({ loadPage: true });
    axios
      .get(`${url}/${id}`)
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
      .post(url, data)
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
      .delete(`${url}/${id}`)
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
      .patch(`${url}/${id}`, data)
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
