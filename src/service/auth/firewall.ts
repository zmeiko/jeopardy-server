import { AuthChecker } from "type-graphql";
import Cookies from "cookies";

type Context =
  | {
      cookies?: Cookies;
      user?: {
        userId?: number;
      } | null;
    }
  | undefined;

export const authChecker: AuthChecker<Context> = ({ context }, roles) => {
  return !!context?.user?.userId;
};
