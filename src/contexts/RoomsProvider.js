import React, { useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketProvider';
import { useAsync } from '../hooks/useAsync';
import { getRooms } from '../services/chat-service';

const RoomContext = React.createContext();
export const useRooms = () => useContext(RoomContext);

const RoomsProvider = ({ children }) => {
    const socket = useSocket();
    const { value: rooms } = useAsync(() => getRooms());
    const [selectedRoom, setSelectedRoom] = useState();

    useEffect(() => {
        if (!rooms || !rooms.data.length) return;
        setSelectedRoom(rooms.data[0]._id);
    }, [rooms]);

    return <RoomContext.Provider value={{
        rooms: rooms ? rooms.data : [],
        selectedRoom,
        setSelectedRoom
    }}>
        {children}
    </RoomContext.Provider>
}

export default RoomsProvider;
