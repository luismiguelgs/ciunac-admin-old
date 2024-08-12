import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './SearchBar';
import Menus from './Menus';
import { MbProps } from './MenuButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

//import MailIcon from '@mui/icons-material/Mail';
//import NotificationsIcon from '@mui/icons-material/Notifications';

type Props = {
    title?:string | undefined
    search?: boolean
    broken?:boolean
    handleClickCollapse?():void
    handleClickToggle?():void
    handleLogout():void
}
export default function MyAppBar({title, search=false, broken=false, handleClickCollapse, handleClickToggle, handleLogout}:Props) 
{
    const t = useTheme()
    const navigate = useNavigate()

    const menus:MbProps[] = [
        {
            text:"Opciones",
            icon: <SettingsIcon />,
            onClick: () => navigate('/opciones')
        },
        /*
        {
            icon: <MailIcon />,
            text: 'Mensajes',
            badgeContent: 2
        },
        {
            icon: <NotificationsIcon />,
            text: 'Notificaciones',
            badgeContent: 5
        },
        */
    ]

    const StyledAppBar = styled(AppBar)`
        background-color: ${t.palette.background.default}; // Color azul claro personalizado 
        box-shadow: none; // Eliminar la sombra predeterminada
        border-bottom: rgba(0, 0, 0, 0.1) 1px solid;
        color:  ${t.palette.text.primary};
    `;

    return (
        <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static" >
            <Toolbar>  
                {
                    broken ? (
                        <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 1 }}
                        onClick={handleClickToggle}
                    >
                    <MenuIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 1 }}
                        onClick={handleClickCollapse}
                    >
                    <MenuIcon />
            </IconButton>
                    )
                } 
                
                
            
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                {title}
            </Typography>
            {
                /** Search bar */
                search && (<SearchBar />)
            }
            
            <Box sx={{ flexGrow: 1 }} />

            {/** Button bar */}
            <Menus menus={menus} handleLogout={handleLogout}/>
            </Toolbar>
        </StyledAppBar>
        
        </Box>
    );
}
