import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

export function useActiveSection() {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return "home";
  } else {
    return pathname.split("/")[1];
  }
}

export function markKeyword(letter: string, keyWord: string) {
  return parse(letter.replaceAll(keyWord, `<mark>${keyWord}</mark>`));
}
