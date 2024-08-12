import { AppBar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export type IconMenu = {
    label: string,
    badgeData?: number | 0,
    icon: React.ReactNode,
    handleClick():void
}
export type MenuItem = {
    label:string,
    handleClick():void
}

type Props = {
    title:string,
    menuIcon?:boolean
    icons?:IconMenu[] | null,
    handleClickMenu?():void,
    drawer?:boolean,
    auth?: boolean,
    itemsMenu?: MenuItem[] | null
}

export default function MyAppBar({title, menuIcon=false, icons=null,drawer=false, handleClickMenu, auth=false, itemsMenu=null}:Props) 
{
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let titleSx:any
    menuIcon ? titleSx = { display: { xs: 'none', sm: 'block'}} : titleSx = { flexGrow: 1, display: { xs: 'none', sm: 'block'}}

    return (
        <React.Fragment>
            <AppBar 
                position={ drawer ? "fixed" : "static" }
                style={drawer ? {} : {width:'100%',marginBottom:'12px'}}
                sx={drawer ? {zIndex: (theme) => theme.zIndex.drawer + 1}: {}}>
                <Toolbar>
                    {
                        menuIcon && (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={ drawer ? { mr: 2, display: { sm: 'none' }} : { mr: 2 }}
                                onClick={handleClickMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                        )
                    }
                    <Typography 
                        noWrap 
                        variant="h6" 
                        component="div" 
                        sx={ titleSx }
                    >
                        {title}
                    </Typography>
                    {
                        icons && (
                            <>
                                { menuIcon && (<Box sx={{ flexGrow: 1 }} />)}
                                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                {
                                    icons?.map((icon)=>(
                                        <Tooltip title={icon.label} key={icon.label}>
                                            <IconButton size="large" aria-label={icon.label} color="inherit"  onClick={icon.handleClick}>
                                                <Badge badgeContent={icon.badgeData} color="error">
                                                    {icon.icon}
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>
                                    ))
                                }
                                </Box>
                            </>
                        )
                    }
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{vertical: 'top',horizontal: 'right',}}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right',}}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {
                                    itemsMenu?.map((item)=>(
                                        <MenuItem key={item.label} onClick={item.handleClick}>{item.label}</MenuItem>
                                    ))
                                }
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
