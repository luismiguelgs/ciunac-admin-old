import { Divider, List,ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export type itemList = {
    label:string,
    route:string,
    icon: React.ReactNode,
}
type Props = {
  items:itemList[] 
  divider?: boolean
}

export default function MyList({items, divider=true}:Props) {
  return (
    <React.Fragment>
        <List>
            {divider && (<Divider />)}
            {
                items.map((item,index)=>(
                    <ListItem key={index} disablePadding component={Link} to={item.route} color="inherit">
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label}/>
                      </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    </React.Fragment>
  )
}
