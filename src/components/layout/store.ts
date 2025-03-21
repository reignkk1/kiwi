import { create } from "zustand";
import { parserLocalStorage } from "parser-storages";

interface IsModalStore {
  isModal: boolean;
  showModal: () => void;
  hiddenModal: () => void;
}

interface UserNameStore {
  userName: string;
  setUserName: (name: UserNameStore["userName"]) => void;
}

interface NavBarMenuStore {
  activeMenu: {
    home: boolean;
    search: boolean;
    storage: boolean;
  };
  setActiveMenu: (currentPage: string) => void;
}

export const createUserNameStore = create<UserNameStore>((set) => ({
  userName: "",
  setUserName: (name) => set(() => ({ userName: name.slice(0, 4) })),
}));

export const createIsModalStore = create<IsModalStore>((set) => ({
  isModal: false,
  showModal: () => set(() => ({ isModal: true })),
  hiddenModal: () => set(() => ({ isModal: false })),
}));

const activeMenuInitialState = {
  home: false,
  search: false,
  storage: false,
};

export const createNavBarMenuStore = create<NavBarMenuStore>((set) => ({
  activeMenu: activeMenuInitialState,
  setActiveMenu: (currentPage) =>
    set(() => ({
      activeMenu: { ...activeMenuInitialState, [currentPage]: true },
    })),
}));
