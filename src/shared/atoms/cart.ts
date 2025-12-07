import { atom } from 'jotai';

type ProductId = number;

export type CartItem = {
  productId: ProductId;
  quantity: number;
};

export const cartAtom = atom<CartItem[]>([]);

export const incrementItemAtom = atom(null, (get, set, id: number) => {
  const prev = get(cartAtom);
  const exists = prev.some(item => item.productId === id);

  if (exists) {
    const next = prev.map(item => (item.productId === id ? { ...item, quantity: item.quantity + 1 } : item));
    set(cartAtom, next);
  } else {
    set(cartAtom, [...prev, { productId: id, quantity: 1 }]);
  }
});

export const decrementItemAtom = atom(null, (get, set, id: number) => {
  const prev = get(cartAtom);
  const item = prev.find(item => item.productId === id);

  if (!item) {
    return;
  }

  if (item.quantity <= 1) {
    set(
      cartAtom,
      prev.filter(item => item.productId !== id)
    );
  } else {
    const next = prev.map(item => (item.productId === id ? { ...item, quantity: item.quantity - 1 } : item));
    set(cartAtom, next);
  }
});
