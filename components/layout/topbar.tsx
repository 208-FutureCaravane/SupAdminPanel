"use client"
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Badge, Tooltip, Popover, List, ListItem, ListItemText, Divider, Chip } from "@mui/material"
import React from 'react'
import {
  Notifications as NotificationsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material"
import { useTheme } from "@/components/theme-provider"

const drawerWidth = 280

interface TopbarProps {
  title: string
}

export function Topbar({ title }: TopbarProps) {
  const { isDarkMode, toggleTheme } = useTheme()

  // Recent anomalies (lightweight snapshot)
  const recentAnomalies = [
    { id: 'a1', title: 'Revenue drop detected', severity: 'critical', minutes: 2 },
    { id: 'a2', title: 'Suspicious login pattern', severity: 'high', minutes: 14 },
    { id: 'a3', title: 'Order latency spike', severity: 'medium', minutes: 27 },
  ]

  const severityMeta: Record<string, { color: string; icon: JSX.Element }> = {
    critical: { color: '#E53935', icon: <ErrorIcon fontSize="small" /> },
    high: { color: '#FB8C00', icon: <WarningIcon fontSize="small" /> },
    medium: { color: '#2196F3', icon: <InfoIcon fontSize="small" /> },
    low: { color: '#4CAF50', icon: <CheckCircleIcon fontSize="small" /> },
  }

  // Notification popover state
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const openNotif = Boolean(anchorEl)
  const handleOpenNotif = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const handleCloseNotif = () => setAnchorEl(null)

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        background: isDarkMode
          ? 'linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)'
          : 'rgba(255,255,255,0.85)',
        backdropFilter: isDarkMode ? 'blur(22px)' : 'blur(8px)',
        border: isDarkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        color: isDarkMode ? 'rgba(255,255,255,0.92)' : '#27364a',
      }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: '1.45rem',
              ...(isDarkMode
                ? {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.65) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 2px 4px rgba(0,0,0,0.25)'
                  }
                : {
                    color: '#1f2d3d',
                    textShadow: '0 1px 2px rgba(0,0,0,0.06)'
                  })
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} arrow>
            <IconButton 
              onClick={toggleTheme} 
              sx={{
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(229,57,53,0.12) 0%, rgba(251,140,0,0.12) 100%)',
                backdropFilter: 'blur(6px)',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(229,57,53,0.25)',
                color: isDarkMode ? 'rgba(255,255,255,0.9)' : '#E53935',
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: isDarkMode
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.18) 100%)'
                    : 'linear-gradient(135deg, rgba(229,57,53,0.18) 0%, rgba(251,140,0,0.18) 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
                }
              }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications" arrow>
            <IconButton
              onClick={handleOpenNotif}
              sx={{
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(229,57,53,0.12) 0%, rgba(251,140,0,0.12) 100%)',
                backdropFilter: 'blur(6px)',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(229,57,53,0.25)',
                color: isDarkMode ? 'rgba(255,255,255,0.9)' : '#FB8C00',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: isDarkMode
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.18) 100%)'
                    : 'linear-gradient(135deg, rgba(229,57,53,0.18) 0%, rgba(251,140,0,0.18) 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
                }
              }}
            >
              <Badge
                badgeContent={recentAnomalies.length}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#E53935',
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(229,57,53,0.4)'
                  }
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Popover
            open={openNotif}
            anchorEl={anchorEl}
            onClose={handleCloseNotif}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                mt: 1,
                width: 340,
                borderRadius: 3,
                border: '1px solid var(--border)',
                background: isDarkMode ? 'rgba(20,20,24,0.9)' : 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 40px -4px rgba(0,0,0,0.2)'
              }
            }}
          >
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography variant='subtitle2' fontWeight={700} sx={{ letterSpacing: '.5px' }}>Dernières anomalies</Typography>
              <Typography variant='caption' color='text.secondary'>Mises à jour récentes</Typography>
            </Box>
            <Divider />
            <List dense disablePadding>
              {recentAnomalies.map((a, idx) => {
                const meta = severityMeta[a.severity] || severityMeta['medium']
                return (
                  <ListItem key={a.id} sx={{ py: 1.2, px: 2, alignItems: 'flex-start' }}>
                    <Box sx={{ mr: 1, mt: '2px', color: meta.color }}>{meta.icon}</Box>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Typography variant='body2' fontWeight={600}>{a.title}</Typography>
                          <Chip size='small' label={a.severity.toUpperCase()} sx={{ bgcolor: meta.color, color: '#fff', height: 20 }} />
                        </Box>
                      }
                      secondary={<Typography variant='caption' color='text.secondary'>{a.minutes} min ago</Typography>}
                    />
                  </ListItem>
                )
              })}
            </List>
            <Divider />
            <Box sx={{ p: 1.5, textAlign: 'center' }}>
              <Typography variant='caption' sx={{ cursor: 'pointer', fontWeight: 600, color: isDarkMode ? '#FB8C00' : '#E53935' }}>Voir toutes les anomalies</Typography>
            </Box>
          </Popover>

          <Tooltip title="Admin Profile" arrow>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                ml: 1,
                background: isDarkMode
                  ? 'linear-gradient(135deg, #1976d2 0%, #1976d2DD 100%)'
                  : 'linear-gradient(135deg, #E53935 0%, #FB8C00 100%)',
                cursor: 'pointer',
                border: isDarkMode ? '2px solid rgba(255,255,255,0.25)' : '2px solid rgba(0,0,0,0.08)',
                boxShadow: isDarkMode
                  ? '0 8px 16px rgba(25,118,210,0.35)'
                  : '0 6px 14px rgba(229,57,53,0.28)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontWeight: 700,
                color: '#fff',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDarkMode
                    ? '0 12px 24px rgba(25,118,210,0.45)'
                    : '0 10px 22px rgba(229,57,53,0.35)'
                }
              }}
            >
              A
            </Avatar>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
