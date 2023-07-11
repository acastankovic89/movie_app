import { useState, useEffect } from 'react';
import './AdminLogIn.css'
import axios from 'axios';
import { useNavigate  } from 'react-router';
import bcrypt from "bcryptjs";
import AdminHome from '../AdminHome/AdminHome';

const AdminLogIn = () => {

    const [email, setEmail] = useState('')
    const [responseMessage, setResponseMessage] = useState()
    const [nonHashPassword, setNonHashPassword] = useState("");
    const [status, setStatus] = useState(null)
    const [bedAutentification, setBedAutentification] = useState(false)
    const [displayAuthMessage, setDisplayAuthMessage] = useState({visibility: 'hidden'})
    const navigate  = useNavigate()
    const password = bcrypt.hashSync(
        nonHashPassword,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );

    useEffect(()=> {
        if(status === 200) {
            navigate('/adminHome');
        }
    }, [navigate, status])
    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/login-admin-user', {email, password})
            if(response.data.status === 404) {
                setBedAutentification(true)
                setDisplayAuthMessage({visibility: 'visible'})
                
            }
            setResponseMessage(response.data.message)
            setStatus(response.data.status);            
        } catch (error) {
            console.log(error.stack)
        }
        
    }

    const handeleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handelePasswordChange = (event) => {
        setNonHashPassword(event?.target.value);
      };

    return (
        <div className='adminLogInWrapper'>
            <div className='formWrapper'>
                <form onSubmit={handleSubmit}>
                    <h3>Sign In</h3>
                    <input 
                    type="text" 
                    name='adminEmail'
                    className={bedAutentification ? 'require formInput logIn black' : 'formInput logIn black '} 
                    value={email} 
                    placeholder='Email' 
                    onChange={handeleEmailChange}
                    />
                    <p className='authMessage' style={displayAuthMessage}>Please enter a valid email or phone number.</p>
                    <input 
                    type="password" 
                    name='adminPassword' 
                    className={bedAutentification ? 'require formInput logIn black' : 'formInput logIn black '} 
                    value={nonHashPassword} 
                    placeholder='Password'
                    onChange={handelePasswordChange}
                    />
                    <p className='authMessage' style={displayAuthMessage}>Your password must contain between 4 and 60 characters.</p>
                    <button className='red btn logIn' type='submit'>Admin LogIn</button>
                </form>
            </div>
            {responseMessage && (
        <AdminHome>
          {(responseMessage) => <div>{responseMessage}</div>}
        </AdminHome>
      )}
        </div>
    )
}

export default AdminLogIn;