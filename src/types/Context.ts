import Cookies from "cookies";
export interface Context {
  cookies?: Cookies;
  user?: {
    userId: number;
  };
}
