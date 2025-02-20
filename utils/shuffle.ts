import { Movie } from "../types";

export function shuffle(array: Movie[]): Movie[] {
  let newArray = array.slice();
  let currentIndex = newArray.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
}
