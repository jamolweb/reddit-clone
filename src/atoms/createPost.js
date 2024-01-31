import { atom } from "recoil";

let arr = [0, 0];

export const createPostAtom = atom({
  key: " createPostAtom",
  default: arr,
});
