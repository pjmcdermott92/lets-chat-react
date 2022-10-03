import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ id, children }) => {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_API_URL, { query: { id } });
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;
