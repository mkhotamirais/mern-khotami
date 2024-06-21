// router.route("/me").get(getMe).patch(updateMe).delete(deleteMe);
const url = "http://localhost:5000/api/khotami-mern/auth";
import axios from "axios";

export const axiosCred = axios.create({
  withCredentials: true, // Mengatur agar axios mengirim cookie secara otomatis
});

import { create } from "zustand";
export const useAuth = create((set) => ({
  userData: null,
  loadIn: false,
  loadUp: false,
  loadOut: false,
  loadUpdateMe: false,
  loadDeleteMe: false,
  signin: async (data) => {
    set({ loadIn: true });
    return await axiosCred
      .patch(`${url}/signin`, data)
      .then((res) => {
        set({ loadUp: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadUp: false });
        return { ok: false, message: err?.response.data.message };
      });
  },
  signup: async (data) => {
    set({ loadUp: true });
    return await axios
      .post(`${url}/signup`, data)
      .then((res) => {
        set({ loadUp: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadUp: false });
        return { ok: false, message: err?.response.data.message };
      });
  },
  signout: async () => {
    set({ loadOut: true });
    return await axiosCred
      .patch(`${url}/signout`)
      .then((res) => {
        set({ loadOut: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadOut: false });
        return { ok: false, message: err?.response?.data?.message };
      });
  },
  getMe: async () => {
    axiosCred
      .get(`${url}/me`)
      .then((res) => {
        set({ userData: res.data.data });
      })
      .catch(() => {
        set({ userData: null });
      });
  },
  updateMe: async (data) => {
    set({ loadUpdateMe: true });
    return await axiosCred
      .patch(`${url}/me`, data)
      .then((res) => {
        set({ userData: res.data.data, loadUpdateMe: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ userData: null });
        return { ok: false, message: err?.response?.data?.message };
      });
  },
  deleteMe: async () => {
    set({ loadDeleteMe: true });
    return await axiosCred
      .delete(`${url}/me`)
      .then((res) => {
        set({ loadDeleteMe: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadDeleteMe: false });
        return { ok: false, message: err?.response?.data?.message };
      });
  },
}));
