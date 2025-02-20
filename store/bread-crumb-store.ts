import { useEffect } from "react";
import { create } from "zustand";

export type Breadcrumb = {
  label: string;
  href: string;
};

type BreadcrumbState = {
  breadcrumbs: Breadcrumb[];
  addBreadcrumb: (_newBreadcrumb: Breadcrumb) => void;
  removeBreadcrumbByHref: (_href: string) => void;
  updateBreadcrumb: (_index: number, _updatedBreadcrumb: Breadcrumb) => void;
  setBreadcrumbs: (_newBreadcrumbs: Breadcrumb[]) => void;
  clearBreadcrumbs: () => void;
};

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  breadcrumbs: [],
  addBreadcrumb: (crumb) =>
    set((state) => {
      const existingIndex = state.breadcrumbs.findIndex(
        (bc) => bc.href === crumb.href
      );
      if (existingIndex !== -1) {
        const updated = [...state.breadcrumbs];
        updated[existingIndex] = crumb;
        return { breadcrumbs: updated };
      }
      return { breadcrumbs: [...state.breadcrumbs, crumb] };
    }),
  removeBreadcrumbByHref: (href) =>
    set((state) => ({
      breadcrumbs: state.breadcrumbs.filter(
        (breadcrumb) => breadcrumb.href !== href
      ),
    })),
  updateBreadcrumb: (index, updatedBreadcrumb) =>
    set((state) => ({
      breadcrumbs: state.breadcrumbs.map((breadcrumb, i) =>
        i === index ? updatedBreadcrumb : breadcrumb
      ),
    })),
  setBreadcrumbs: (newBreadcrumbs) =>
    set(() => ({
      breadcrumbs: newBreadcrumbs,
    })),
  clearBreadcrumbs: () =>
    set(() => ({
      breadcrumbs: [],
    })),
}));

export const useAddBreadcrumb = (newBreadcrumb: Breadcrumb) => {
  const { addBreadcrumb, removeBreadcrumbByHref } = useBreadcrumbStore();

  useEffect(() => {
    addBreadcrumb(newBreadcrumb);

    return () => {
      removeBreadcrumbByHref(newBreadcrumb.href);
    };
  }, [addBreadcrumb, removeBreadcrumbByHref]);
};
