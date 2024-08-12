import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Props = {
    children: React.ReactNode
    title:string
}

export default function CardChart({children, title}:Props) {
  return (
    <React.Fragment>
        <Card sx={{ maxWidth: 550 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                {children}
            </CardContent>
            <CardActions>
                {/*<Button size="small">Learn More</Button>*/}
            </CardActions>
        </Card>
    </React.Fragment>
  )
}
