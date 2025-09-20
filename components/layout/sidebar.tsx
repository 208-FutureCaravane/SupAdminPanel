"use client"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  useTheme,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Restaurant as RestaurantIcon,
  Analytics as AnalyticsIcon,
  Warning as WarningIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"

const drawerWidth = 280

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { id: "restaurants", label: "Restaurants", icon: RestaurantIcon },
  { id: "analytics", label: "Analytics", icon: AnalyticsIcon },
  { id: "anomalies", label: "AI Anomaly Detection", icon: WarningIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'
  const inactiveLight = '#5f6f89' // subtle blue-gray
  const activeLight = '#1976d2'   // primary blue

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: isLight
            ? 'rgba(255,255,255,0.9)'
            : 'linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
          backdropFilter: 'blur(20px)',
          border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.18)',
          borderRadius: "0 20px 20px 0",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
          color: isLight ? inactiveLight : undefined,
        },
      }}
    >
      <Box sx={{ p: 3, mb: 2 }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          mb: 1,
          background: isLight
            ? 'linear-gradient(135deg, rgba(25,118,210,0.08) 0%, rgba(25,118,210,0.02) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
          borderRadius: 3,
          p: 2,
          border: isLight ? '1px solid rgba(25,118,210,0.15)' : '1px solid rgba(255,255,255,0.1)'
        }}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 50,
          }}>
            <img 
              src="/LogoAdmin.svg" 
              alt="MaidAdmin Logo" 
              style={{
                height: '90px',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
        </Box>
      </Box>

      <List sx={{ px: 2 }}>
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => onSectionChange(item.id)}
                sx={{
                  borderRadius: 3,
                  p: 1.5,
                  transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isActive
                    ? (isLight
                        ? 'linear-gradient(135deg, rgba(25,118,210,0.18) 0%, rgba(66,165,245,0.18) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 100%)')
                    : 'transparent',
                  border: isActive
                    ? (isLight ? '1px solid rgba(25,118,210,0.35)' : '1px solid rgba(255,255,255,0.3)')
                    : '1px solid transparent',
                  color: isActive
                    ? (isLight ? activeLight : '#1976d2')
                    : (isLight ? inactiveLight : 'rgba(255,255,255,0.8)'),
                  boxShadow: isActive
                    ? (isLight
                        ? '0 4px 14px rgba(25,118,210,0.25)'
                        : '0 8px 32px 0 rgba(0, 0, 0, 0.1)')
                    : 'none',
                  '&:hover': {
                    background: isActive
                      ? (isLight
                          ? 'linear-gradient(135deg, rgba(25,118,210,0.24) 0%, rgba(66,165,245,0.24) 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 100%)')
                      : (isLight
                          ? 'rgba(25,118,210,0.06)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'),
                    border: isActive
                      ? (isLight ? '1px solid rgba(25,118,210,0.45)' : '1px solid rgba(255,255,255,0.35)')
                      : (isLight ? '1px solid rgba(25,118,210,0.15)' : '1px solid rgba(255,255,255,0.15)'),
                    transform: 'translateX(6px)',
                    color: isActive
                      ? (isLight ? activeLight : '#1976d2')
                      : (isLight ? activeLight : 'rgba(255,255,255,0.9)'),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 44,
                    '& svg': {
                      fontSize: 22,
                      filter: isActive
                        ? (isLight
                            ? 'drop-shadow(0 2px 4px rgba(25,118,210,0.35))'
                            : 'drop-shadow(0 2px 4px rgba(25,118,210,0.3))')
                        : 'none',
                      transition: 'filter .25s'
                    }
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.95rem",
                    letterSpacing: "0.25px"
                  }}
                />
                {isActive && (
                  <Box
                    sx={{
                      width: 4,
                      height: 20,
                      borderRadius: 2,
                      background: isLight
                        ? 'linear-gradient(180deg, #1976d2 0%, #42a5f5 100%)'
                        : 'linear-gradient(135deg, #1976d2 0%, #1976d2DD 100%)',
                      ml: 1,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      {/* Bottom decoration */}
      <Box sx={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        p: 2,
        borderRadius: 3,
        background: isLight
          ? 'linear-gradient(135deg, rgba(25,118,210,0.08) 0%, rgba(66,165,245,0.08) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        border: isLight ? '1px solid rgba(25,118,210,0.15)' : '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center'
      }}>
        <Typography
          variant='caption'
          sx={{
            color: isLight ? inactiveLight : 'rgba(255,255,255,0.6)',
            fontWeight: 500
          }}
        >
          Version 2.0.1
        </Typography>
      </Box>
    </Drawer>
  )
}
