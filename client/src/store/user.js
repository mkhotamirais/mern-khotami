import { create } from "zustand";
import { axiosCred } from "./auth";
const url = "http://localhost:5000/api/khotami-mern/user";

// router.use(isLogin, isAdmin);
// router.route("/").get(getUsers).post(postUser);
// router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export const useUser = create((set) => ({
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
  errPage: null,
  loadPost: false,
  loadUpdate: false,
  getUsers: async () => {
    set({ loadPage: true });
    axiosCred
      .get(url)
      .then((res) => {
        set({ data: res?.data?.data, loadPage: false });
      })
      .catch((err) => {
        set({ errPage: err?.response?.data?.message });
      });
  },
  getUserById: async (id) => {
    set({ loadPage: true });
    axiosCred
      .get(`${url}/${id}`)
      .then((res) => {
        set({ singleData: res?.data?.data, loadPage: false });
      })
      .catch((err) => {
        set({ errPage: err?.response?.data?.message });
      });
  },
  postUser: async (data) => {
    set({ loadPost: true });
    return await axiosCred
      .post(url, data)
      .then((res) => {
        set({ loadPost: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        return { ok: false, message: err?.response?.data?.message };
      });
  },
  deleteUser: async (id) => {
    set({ loadPage: true });
    return await axiosCred
      .delete(`${url}/${id}`)
      .then((res) => {
        set({ loadPage: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        return { ok: false, message: err?.response?.data?.message };
      });
  },
  updateUser: async (id, data) => {
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
