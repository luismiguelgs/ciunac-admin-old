import { Box, Menu, MenuItem } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import React from 'react'
import MenuButton, {MbProps} from './MenuButton';

type Props = {
    menus:MbProps[],
    handleLogout():void | undefined
}

export default function Menus({menus, handleLogout}:Props) 
{
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        handleLogout()
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {/*<MenuItem onClick={handleMenuClose}>Profile</MenuItem>*/}
            <MenuItem onClick={handleMenuClose}>Salir</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';

    

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {
                menus.map((item,index)=>(
                    <MenuButton key={index}
                        text={item.text} 
                        mobile 
                        icon={item.icon}
                        ariaControls={item.ariaControls}
                        onClick={item.onClick} 
                        badgeContent={item.badgeContent} />
                ))
            }
            {
                /**
                 * 
                 * <MenuButton text='Mensajes' mobile icon={<MailIcon />} badgeContent={2} />
                    <MenuButton text='Notificaciones' mobile icon={<NotificationsIcon />} badgeContent={5} />
                    
                 * 
                 */
            }
            <MenuButton text='Perfil' mobile icon={<AccountCircle />} ariaControls={menuId} onClick={handleProfileMenuOpen}/>
        </Menu>
    );

    return (
        <React.Fragment>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {
                    menus.map((item,index)=>(
                        <MenuButton key={index}
                            text={item.text} 
                            icon={item.icon}
                            ariaControls={item.ariaControls}
                            onClick={item.onClick} 
                            edge={item.edge}
                            badgeContent={item.badgeContent} />
                    ))
                }
                {/** 
                <MenuButton text='Mensajes' icon={<MailIcon />} badgeContent={2} />
                <MenuButton text='Notificaciones' icon={<NotificationsIcon />} badgeContent={5} />
                
                */}
                <MenuButton text='Perfil' icon={<AccountCircle />} ariaControls={menuId} onClick={handleProfileMenuOpen} edge='end'/>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <MenuButton icon={<MoreIcon />} ariaControls={mobileMenuId} onClick={handleMobileMenuOpen} />
                
                {renderMobileMenu}
                {renderMenu}
            </Box>
        </React.Fragment>
    )
}
