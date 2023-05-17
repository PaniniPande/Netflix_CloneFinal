import React, { useState, useEffect } from 'react'
import './Nav.css'
import { useHistory } from 'react-router-dom';

function Nav() {

    const [show, handleShow] = useState(false);
    const history = useHistory();
    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', transitionNavbar);
        return () => window.removeEventListener('scroll', transitionNavbar);
    }, []);
    return (
        <div className={`nav ${show && 'nav__black'}`}>

            <div className='nav__contents'>
                <img
                onClick={() => 
                    history.push("/")
                    }
                    className='nav_logo'
                    src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
                    alt=''
                />
                <img
                    onClick={() => 
                    history.push("/profile")
                    }
                    
                    className='nav_avatar'
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu9VhASGSfFj_77fZ748zUwZZ0HbLv35YYrd93apRFEjDlRDUcoBJlyiiLfzxymVaJMp0&usqp=CAU' alt='' />

            </div>
        </div>

    )
}


export default Nav