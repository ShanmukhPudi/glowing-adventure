import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")) || null
    );

    const login = (data) => {
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("userToken", data.token);
        setUser(data);
    };

    const logout = () =>{
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userToken");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);