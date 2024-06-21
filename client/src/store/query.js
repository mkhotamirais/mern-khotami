import { create } from "zustand";

export const useQuery = create((set) => ({
  q: "",
  category: "",
  sort: "",
  tagIds: [],
  tagIdsStr: "",
  query: { limit: 2 },
  queryStr: "",
  setQ: (q) => set({ q }),
  setCategory: (category) => set({ category }),
  setSort: (sort) => set({ sort }),
  setTagIds: (id) =>
    set((state) => ({
      tagIds: state.tagIds.includes(id) ? state.tagIds.filter((t) => t !== id) : [...state.tagIds, id],
    })),
  setTagIdsStr: (tagIds) => {
    set((state) => {
      const result = tagIds.join("&tag=");
      if (state.queryStr.length > 0) return { tagIdsStr: "&tag=" + result };
      else return { tagIdsStr: "?tag=" + result };
    });
  },
  setQuery: (query) => set((state) => ({ query: { ...state.query, ...query } })),
  setQueryStr: (query) => {
    set(() => {
      const result = Object.entries(query)
        .map((item) => item.join("="))
        .join("&");
      return { queryStr: result };
    });
  },
  resetAll: () => set({ q: "", category: "", sort: "", tagIds: [], tagIdsStr: "", query: { limit: 2 }, queryStr: "" }),
}));
