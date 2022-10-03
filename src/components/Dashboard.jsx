import { useRooms } from '../contexts/RoomsProvider';
import ChatWindow from './ChatWindow/ChatWindow';
import Rooms from './Rooms/Rooms';
import UserList from './UserList/UserList';

const Dashboard = () => {
    const { rooms, selectedRoom } = useRooms();
    const currentRoom = rooms?.find(room => room._id === selectedRoom);

    return (
        <div className='dashboard'>
            <Rooms />
            <div className='middle'>
                {selectedRoom ? <ChatWindow room={currentRoom} /> : 'Select a room'}
            </div>
            <UserList />
        </div>
    )
}

export default Dashboard;
