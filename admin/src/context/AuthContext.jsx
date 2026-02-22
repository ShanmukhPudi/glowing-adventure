import { createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(
        JSON.parse(localStorage.getItem("adminInfo")) || null
    );

    const login = (data) => {
        localStorage.setItem("adminInfo", JSON.stringify(data));
        localStorage.setItem("adminToken", data.token);
        setAdmin(data);
    };

    const logout = () => {
        localStorage.removeItem("adminInfo");
        localStorage.removeItem("adminToken");
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value = {{admin, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook to use auth anywhere in the app
export const useAuth =() => useContext(AuthContext);