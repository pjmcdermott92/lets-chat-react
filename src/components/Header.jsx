import { useAuth } from '../contexts/AuthProvider';
import { IoChatbubbles } from 'react-icons/io5';

const Header = () => {
    const { currentUser } = useAuth();

    return (
        <header className='app-header'>
            <h1 className='app-logo'>
                <IoChatbubbles />
                Let's Chat
            </h1>
            {currentUser && currentUser.display_name}
        </header>
    )
}

export default Header