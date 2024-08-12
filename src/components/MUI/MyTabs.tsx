import { Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'

export type PanelTab = {
    label:string,
    content: React.ReactNode
}
type Props = {
    panels:PanelTab[]
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

export default function MyTabs({panels}:Props) 
{
    //tabs
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event);
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {
                        panels.map((panel,index)=>(
                            <Tab key={index} label={panel.label} />
                        ))
                    }
                </Tabs>
            </Box>
            {
                panels.map((panel,index)=>(
                    <CustomTabPanel key={index} value={value} index={index}>
                        {panel.content}
                    </CustomTabPanel>
                ))
            }
        </React.Fragment>
    )
}
