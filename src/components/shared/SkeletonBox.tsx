import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";

export default function SkeletonBox({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading: boolean;
}) {
  if (isLoading) {
  }
  console.log(children);

  return <div>{children}</div>;
}
