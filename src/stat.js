import { atom } from "recoil";

export const  userDataAtom = atom({
  key: "userDataAtom",
  default: null,
});

export const  answerDataAtom = atom({
    key: "answerDataAtom",
    default: null,
  });