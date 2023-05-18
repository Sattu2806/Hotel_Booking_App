import { create } from 'zustand';

interface CategoryModalStore{
    isOpen: boolean;
    onOpen: () => void
    onClose: () => void
}

const useCategoryModal = create<CategoryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useCategoryModal
