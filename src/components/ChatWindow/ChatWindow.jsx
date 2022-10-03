import s from './ChatWindow.module.css';

const ChatWindow = ({ room }) => {

    return (
        <div className={s.chatWindow}>
            <h2 className={s.title}><span>#</span> {room.name} - {room.description}</h2>
            <div className={s.messages}>

            </div>
            
            <div className={s.messageInput}>
                <form>
                    <input placeholder='Type a message...' />
                    <button className='btn btn-success' type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default ChatWindow;
