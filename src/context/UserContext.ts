import { createContext } from "react";

export interface User {
    uid?: string;
    name?: string;
    email?: string;
    image?: string;
}

export interface IUserContext {
    user?: User;
    setUser?: any;
}
export const UserContext = createContext<IUserContext>({});