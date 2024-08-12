import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type PanelData = {
    title: string;
    content: React.ReactNode;
    disabled: boolean;
};

type Props = {
    panels:PanelData[]
}

export default function MyAccordion({panels}:Props) 
{
    //control del acordion
    const [expanded, setExpanded] = React.useState<string | false>('panel0');

    const handleExpand = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        console.log(event.type);
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <React.Fragment>
            {panels.map((panel,index)=>(
                <Accordion 
                    key={`panel${index}`}  
                    disabled={panel.disabled} 
                    expanded={expanded === `panel${index}`} 
                    onChange={handleExpand(`panel${index}`)}>
                        <AccordionSummary 
                            sx={{backgroundColor:'lightskyblue'}}
                            expandIcon={<ExpandMoreIcon />} 
                            aria-controls={`panel${index}a-content`} 
                            id={`panel${index}a-header`}>
                                <Typography>{panel.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {panel.content}
                        </AccordionDetails>
                </Accordion>
            ))}
        </React.Fragment>
    )
}
