import { create } from "zustand";

import { getCurrentUser } from "services/api";

interface User {
  email: string;
  token: string;
  role: string;
  roles: string;
}

interface TUserState {
  data: User | null;
  loading: boolean;
  success: boolean;
  error: boolean;
  errorData: any;
}

interface TUserStore extends TUserState {
  updateUser: (user: User) => void;
  fetchUser: () => void;
  removeUser: () => void;
  logout: () => void;
}

const initialState: TUserState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

const useUserStore = create<TUserStore>()((set) => ({
  ...initialState,

  updateUser: (user: User) => {
    set({
      loading: false,
      success: true,
      data: user,
      error: false,
      errorData: null,
    });
  },

  fetchUser: async () => {
    set({ loading: true });

    try {
      // Simulate API call to get the user
      const data = await getCurrentUser(); // Replace with actual fetch
      set({ data, success: true, loading: false });
    } catch (error) {
      set({ error: true, loading: false, errorData: error });
    }
  },

  removeUser: () => set({ data: null }),

  logout: () => {
    set({ data: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
  },
}));

export default useUserStore;
