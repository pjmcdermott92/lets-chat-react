import React, { useContext, useState, useEffect } from 'react';
import { useAsyncFn } from '../hooks/useAsync';
import { getUser, logoutUser } from '../services/auth-service';

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const getCurrentUserFn = useAsyncFn(getUser);
    const logoutFn = useAsyncFn(logoutUser);

    const getCurrentUser = () => {
        setLoading(true);
        return getCurrentUserFn
            .execute()
            .then(user => {
                if (!user.success) return;
                setCurrentUser(user.data);
            })
            .finally(() => setLoading(false));
    }

    const logout = () => {
        return logoutFn
            .execute()
            .then(res => {
                if (!res.success) return;
                setCurrentUser(null);
            });
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return <AuthContext.Provider value={{
       currentUser,
       getCurrentUser,
       logout
    }}>
        {loading ? 'Loading...' : children}
    </AuthContext.Provider>
}

export default AuthProvider;
