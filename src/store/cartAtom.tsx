import { atom } from "recoil";

// カートの状態を保持
export const cartState = atom({
  key: "cartState",
  default: [],
});
