import { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useAsyncFn } from '../hooks/useAsync';
import { loginUser } from '../services/auth-service';
import { Link } from 'react-router-dom';
import Alert from './Alert';

const Login = () => {
    const { getCurrentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();
    const loginFn = useAsyncFn(loginUser);

    const handleLogin = e => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) return setError('Please enter your Email Address and Password');
        
        setLoading(false);
        setError(null);
        return loginFn
            .execute({ email: email.toLowerCase(), password })
            .then(res => {
                if (!res.success) {
                    setError(res.message);
                    passwordRef.current.value = '';
                } else {
                    getCurrentUser();
                }
            })
            .finally(() => setLoading(false));
    }
    
    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleLogin}>
                <h2>Welcome back!</h2>
                <p>Log in below to continue!</p>
                {error && <Alert variant={'danger'} message={error} />}
                <div className='form-group'>
                    <label htmlFor='email'>Email address <span className='err-text'>*</span></label>
                    <input type='email' id='email' ref={emailRef} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password <span className='err-text'>*</span></label>
                    <input type='password' id='password' ref={passwordRef} required />
                </div>
                <div className='form-group'>
                    <button className='btn btn-success' type='submit'>Log In</button>
                </div>
                <p>New around here? <Link to='/register'>Create an account</Link>.</p>
            </form>
        </div>
    )
};

export default Login;
