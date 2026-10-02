import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Use este Link em todo href interno — ele acrescenta o prefixo do idioma. */
export const { Link, usePathname, getPathname } = createNavigation(routing);
