import { create } from 'zustand'

const useStore = create((set) => ({
  order: {
    weight: 0,
    address: {
      title: '',
      detail: '',
    },
    pickupDate: '',
    pickupTime: '',
    deliveryDate: '',
    deliveryTime: '',
    notes: '',
    serviceId: null,
  },
  setOrderData: (data) =>
    set((state) => ({
      order: {
        ...state.order,
        ...data,
        address: {
          ...state.order.address,
          ...data.address, // pastikan nested object di-merge
        },
      },
    })),
  resetOrder: () =>
    set({
      order: {
        weight: 0,
        address: { title: '', detail: '' },
        pickupDate: '',
        pickupTime: '',
        deliveryDate: '',
        deliveryTime: '',
        notes: '',
        serviceId: null,
      },
    }),
}))

export default useStore
