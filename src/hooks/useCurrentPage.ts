import { useLocation } from "react-router-dom";
import { Pages } from "../types";

export function useCurrentPage() {
  const { pathname } = useLocation();

  const pageMap: { [key: string]: string } = {
    "/": "home",
    "/search": "search",
    "/drawer": "drawer",
    "/player": "player",
  };

  if (pathname.startsWith("/music")) {
    return "music";
  } else if (pathname.startsWith("/album")) {
    return "album";
  }

  return (pageMap[pathname] as Pages) || "unknown";
}
