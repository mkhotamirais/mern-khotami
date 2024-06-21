import { create } from "zustand";

export const useBasic = create((set) => ({
  theme: JSON.parse(localStorage.getItem("khotamiMernTheme")),
  openNav: false,
  openAside: false,
  openBubble: false,
  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("khotamiMernTheme", JSON.stringify(theme));
      return { theme };
    }),
  toggleOpenNav: () => set((state) => ({ openNav: !state.openNav })),
  removeOpenNav: () => set(() => ({ openNav: false })),
  toggleOpenAside: () => set((state) => ({ openAside: !state.openAside })),
  removeOpenAside: () => set(() => ({ openAside: false })),
  toggleOpenBubble: () => set((state) => ({ openBubble: !state.openBubble })),
  removeOpenBubble: () => set(() => ({ openBubble: false })),
}));
