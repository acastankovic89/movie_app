import React, { useEffect } from "react"
import Cookies from "js-cookie"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './UserMenu.css'

const UserMenu = () => {

    const cookie = Cookies.get('response')

    let user = {};
    try {
        if(cookie) {
            const parsedCookie = JSON.parse(cookie);
            user = parsedCookie || {};
        }
    } catch (error) {
        console.error("Error parsing JSON from cookie:", error);
    }
    


const logOut = () => {
    Cookies.remove('response');
    window.location.href = '/'
}
    return (
        <div className="userMenu">
            <div className="userMenuWrapper">
                <div className="desc">
                <FontAwesomeIcon icon={faUser} />
                    <p>{user.firstName} {user.lastName}</p>
                </div>
                <div className="logOutButton">
                    <button onClick={logOut} className="red btn logIn">Log out</button>
                </div>
            </div>
            
        </div>
    )
} 

export default UserMenu