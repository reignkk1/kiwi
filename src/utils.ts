import { useLocation } from "react-router-dom";

export function useActiveSection() {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return "home";
  } else {
    return pathname.split("/")[1];
  }
}
