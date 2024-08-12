import { useLayoutContext } from '../../contexts/LayoutContextProvider';
import { Sidebar, menuClasses, MenuItemStyles } from 'react-pro-sidebar';
import { useTheme } from '@mui/material';
import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';
import Menus from './Menus';

const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };  

type Props = {
  header:boolean,
  footer:boolean
}
export default function MySideBar({header, footer}:Props) 
{
    //const [sidebarCollapsed,setSidebarCollapsed] = React.useState<boolean>(false)
    const t = useTheme()
    const themes = {
        
            sidebar: {
                backgroundColor: t.palette.background.default,
                color: t.palette.text.primary,
            },
            menu: {
                menuContent: '#fbfcfd',
                icon: t.palette.primary.main,
                hover: {
                    backgroundColor: t.palette.secondary.light,
                    color: t.palette.text.primary,
                },
            disabled: {
                color: '#9fb6cf',
            },
          },
        
      };

    const { sidebarToggled, setBroken, sidebarHasImage, setSidebarToggled, sidebarCollapsed } = useLayoutContext()

    const menuItemStyles: MenuItemStyles = {
        root: {
          fontSize: '13px',
          fontWeight: 400,
        },
        icon: {
          color: themes.menu.icon,
          [`&.${menuClasses.disabled}`]: {
            color: themes.menu.disabled.color,
          },
        },
        SubMenuExpandIcon: {
          color: '#b6b7b9',
        },
        subMenuContent: ({ level }) => ({
          backgroundColor:
            level === 0
              ? hexToRgba(themes.menu.menuContent, sidebarHasImage && !sidebarCollapsed ? 0.4 : 1)
              : 'transparent',
        }),
        button: {
          [`&.${menuClasses.disabled}`]: {
            color: themes.menu.disabled.color,
          },
          '&:hover': {
            backgroundColor: hexToRgba(themes.menu.hover.backgroundColor, sidebarHasImage ? 0.8 : 1),
            color: themes.menu.hover.color,
          },
        },
        label: ({ open }) => ({
          fontWeight: open ? 600 : undefined,
        }),
      };

    return (
        <Sidebar 
            width='240px' 
            image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
            collapsed={sidebarCollapsed} 
            collapsedWidth='65px' 
            toggled={sidebarToggled} 
            customBreakPoint='800px'
            onBreakPoint={setBroken}
            backgroundColor={hexToRgba(themes.sidebar.backgroundColor, sidebarHasImage ? 0.9 : 1)}
            rootStyles={{
                color: themes.sidebar.color,
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    {
                        /**Sidebar Header */
                        header && (<SidebarHeader />)
                    }
                    <Menus 
                        menuItemStyles={menuItemStyles} 
                        setSidebarToggled={setSidebarToggled} 
                        sidebarCollapsed={sidebarCollapsed}
                        sidebarToggled={sidebarToggled}
                    />
                    {
                        /**SIDE BAR FOOTER */
                        footer && (<SidebarFooter sidebarCollapsed={sidebarCollapsed} />)
                    }
                </div>
        </Sidebar>
    )
}
