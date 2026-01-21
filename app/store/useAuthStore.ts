// store/authStore.ts
import { create } from "zustand";

type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  createdAt: string;
};

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null, isLoading: false }),
}));


