import { Box, Typography } from '@mui/material'
import { Menu, MenuItem, MenuItemStyles, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import HandymanIcon from '@mui/icons-material/Handyman';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import React from 'react';

type Props = {
    sidebarCollapsed: boolean,
    menuItemStyles: MenuItemStyles,
    sidebarToggled: boolean,
    setSidebarToggled: React.Dispatch<React.SetStateAction<boolean>>,
}
type TitleProps = {
    text: string,
    sidebarCollapsed: boolean,
    start?: boolean,
}
function Title({text,sidebarCollapsed,start=false}:TitleProps):React.ReactNode{
    return (
        <Box display='flex' p='0 24px' mt={start ? 0:2} mb={start ? 0 : '8px'} alignItems='center'>
                <Typography
                    variant="body2"
                    fontWeight={600}
                    style={{ opacity: sidebarCollapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
                >
                    {text}
                </Typography>          
        </Box>
    )
}

export default function Menus({sidebarCollapsed, menuItemStyles, sidebarToggled, setSidebarToggled}:Props) 
{
    const myMenu= (link:string,text:string, icon?:React.ReactNode) => {
        return(
            <MenuItem 
                component={<Link to={link}/>} 
                onClick={()=> setSidebarToggled(!sidebarToggled)}
                icon={icon} >
                    {text}
            </MenuItem>
        )
    }
    return (
        <Box flex={1} mb='32px' sx={{fontFamily:'Roboto'}}>
            <Title sidebarCollapsed={sidebarCollapsed} text='General' />
            <Menu menuItemStyles={menuItemStyles} closeOnClick>
                {myMenu('/','Inicio',<HomeIcon fontSize='small'/>)}
                <SubMenu label="Solicitudes" icon={<InboxIcon fontSize='small' />}>
                    {myMenu('/certificados?estado=NUEVO','Solicitudes Nuevas')}
                    {myMenu('/certificados?estado=ELABORADO','Solicitudes Procesadas')}
                    {myMenu('/certificados?estado=ENTREGADO','Solicitudes Terminadas')}
                </SubMenu>
                <SubMenu label="Certificados" icon={<TaskIcon fontSize='small' />}>
                    {myMenu('/registro-certificados','Certificados')}
                    {myMenu('/registro-certificados/nuevo','Nuevo Certificado')}
                </SubMenu>   
                {myMenu('/solicitud-nueva','Nueva Solicitud',<NoteAddOutlinedIcon fontSize='small'/>)}
                {myMenu('/proceso','Proceso',<AccountTreeIcon fontSize='small'/>)}
                <SubMenu label="Examen de Ubicación" icon={<TranslateOutlinedIcon fontSize='small' />}>
                    {myMenu('/examenes/solicitudes','Solicitudes')}
                    {myMenu('/examenes','Examenes')}
                    {myMenu('/examenes/prospectos','Prospectos')}
                    {myMenu('/examenes/configuracion','Configuración')}
                </SubMenu>    
                {myMenu('/reportes','Reportes',<SummarizeIcon fontSize='small'/>)}
                {myMenu('/opciones','Opciones',<SettingsApplicationsIcon fontSize='small'/>)}
            </Menu>
            <Title sidebarCollapsed={sidebarCollapsed} text='Extra' />
            <Menu menuItemStyles={menuItemStyles} closeOnClick>
                {myMenu('/mantenimiento','Mantenimiento',<HandymanIcon fontSize='small'/>)}
                {myMenu('/usuarios','Usuarios',<SupervisedUserCircleIcon fontSize='small'/>)}
            </Menu>
        </Box>
    )
}
