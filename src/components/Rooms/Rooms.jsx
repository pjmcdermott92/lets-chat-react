import { useRooms } from '../../contexts/RoomsProvider';
import s from './Rooms.module.css';

const Rooms = () => {
    const { rooms, selectedRoom, setSelectedRoom } = useRooms();

    return (
        <div className='sidebar'>
            <h2 className='title'>Rooms</h2>
            {rooms?.length ? (
                <ul className={s.rooms}>
                    {rooms.map(room => (
                        <li
                            key={room._id}
                            className={room._id === selectedRoom ? s.selected : ''}
                            onClick={() => setSelectedRoom(room._id)}
                        >
                            <span>#</span> {room.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No rooms to display.</p>
            )}
        </div>
    )
}

export default Rooms;
