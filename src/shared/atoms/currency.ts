import { atom } from 'jotai';

export type Currency = 'USD' | 'KRW';

export const currencyAtom = atom<Currency>('KRW');
