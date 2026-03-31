import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Primitives de navigation (`Link`, `redirect`, etc.) qui respectent la locale active.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
