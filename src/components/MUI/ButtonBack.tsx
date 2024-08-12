import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ButtonBack() 
{
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Button 
                sx={{color:'white'}} 
                fullWidth 
                onClick={()=>{navigate(-1)}} 
                variant="contained" 
                color="secondary" 
                startIcon={<ArrowBackIcon />}>
                    Atras
            </Button>
        </React.Fragment>
    )
}
