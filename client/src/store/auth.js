// router.route("/me").get(getMe).patch(updateMe).delete(deleteMe);
import axios from "axios";

export const axiosCred = axios.create({
  withCredentials: true, // Mengatur agar axios mengirim cookie secara otomatis
});

import { create } from "zustand";
import { url } from "../lib/data";
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
      .patch(`${url}/auth/signin`, data)
      .then((res) => {
        set({ loadIn: false });
        return { ok: true, message: res?.data?.message };
      })
      .catch((err) => {
        set({ loadIn: false });
        return { ok: false, message: err?.response.data.message };
      });
  },
  signup: async (data) => {
    set({ loadUp: true });
    return await axios
      .post(`${url}/auth/signup`, data)
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
      .patch(`${url}/auth/signout`)
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
      .get(`${url}/auth/me`)
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
      .patch(`${url}/auth/me`, data)
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
      .delete(`${url}/auth/me`)
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
