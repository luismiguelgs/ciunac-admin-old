import React from 'react'
import { Badge, IconButton, MenuItem, Tooltip } from '@mui/material'

export type MbProps = {
    icon: React.ReactNode
    text?: string | undefined,
    onClick?: React.MouseEventHandler<HTMLElement> | undefined
    badgeContent?: number
    mobile?: boolean
    ariaControls?: string | undefined
    edge?: 'start' | 'end' | undefined
}

export default function MenuButton({text, icon, onClick, badgeContent=0, mobile=false, ariaControls=undefined, edge=undefined}:MbProps) {
    if(mobile){
        return (
            <React.Fragment>
                <MenuItem onClick={onClick}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit" aria-controls={ariaControls} edge={edge}>
                        <Badge badgeContent={badgeContent} color="error">
                            {icon}
                        </Badge>
                    </IconButton>
                    <p>{text}</p>
                </MenuItem>
            </React.Fragment>
        )
    }
    else{
        return (
            <Tooltip title={text}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit" edge={edge} onClick={onClick} aria-controls={ariaControls}>
                    <Badge badgeContent={badgeContent} color="error">
                        {icon}
                    </Badge>
                </IconButton>
            </Tooltip>
        )
    }
}
