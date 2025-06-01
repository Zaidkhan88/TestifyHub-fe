import { createContext, useContext, useState,ReactNode } from "react";
interface User {
    _id:string;
    name:string;
    email:string;
    token:string;

}
interface AuthContexttype {
    user:User | null;
    login:(userData:User)=>void;
    logout:()=>void;
}
 const AuthContext = createContext<AuthContexttype | undefined>(undefined)

 export const AuthProvider = ({children}:{children:ReactNode})=>{
    const [user,setUser] = useState<User | null>(null);

    const login = (userData:User)=>{
        setUser(userData)
    };
    const logout = ()=>{
        setUser(null)
    };

    return (
        <AuthContext.Provider value = {{user,login,logout}} >
            {children}
        </AuthContext.Provider>
    );
 }

 export  const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within AuthProvider");
    return context
 }