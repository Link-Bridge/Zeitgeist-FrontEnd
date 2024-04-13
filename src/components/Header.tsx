import { Link } from 'react-router-dom';
//import Colors from '../../colors';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material';
import { useEffect, useState } from 'react';
import profile from './../assets/images/profile.png'
// importar el iconbutton, notificationIcon, avatarProfile

const Header = () => {
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        const date = new Date();
        const dateOption = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
        setCurrentDate(date.toLocaleDateString('en-US', dateOption));
    }, []);

    
    return (
        <div>
            <h1>Welcome Back</h1>
            <p>{currentDate}</p>
            
        </div>
    );
};

export default Header;