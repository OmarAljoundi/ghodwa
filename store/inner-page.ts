import { useEffect } from "react";
import { create } from "zustand";

type InnerState = {
  currentPage: string;
  setCurrentPage: (newCurrentPage: string) => void;
  clearCurrentPage: () => void;
};

export const useInnerStore = create<InnerState>((set) => ({
  currentPage: "",
  setCurrentPage: (newCurrentPage) =>
    set(() => ({
      currentPage: newCurrentPage,
    })),
  clearCurrentPage: () =>
    set(() => ({
      currentPage: "",
    })),
}));

export const useAddInnerPage = (newCurrentPage: string) => {
  const { clearCurrentPage, setCurrentPage } = useInnerStore();

  useEffect(() => {
    setCurrentPage(newCurrentPage);

    return () => {
      clearCurrentPage();
    };
  }, [clearCurrentPage, newCurrentPage, setCurrentPage]);
};
