"use client"

import type React from "react"

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  LinearProgress,
  Paper,
  Avatar,
  Divider,
} from "@mui/material"
import {
  TrendingUp as TrendingUpIcon,
  Restaurant as RestaurantIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
} from "@mui/icons-material"

// Add keyframes for shimmer animation
const shimmerKeyframes = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = shimmerKeyframes
  document.head.appendChild(style)
}

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  color: string
  trend: "up" | "down"
}

function StatCard({ title, value, change, icon, color, trend }: StatCardProps) {
  return (
    <Card 
      sx={{ 
        height: "100%", 
        position: "relative", 
        overflow: "visible",
        background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 3,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          background: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)",
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              color="text.secondary" 
              gutterBottom 
              variant="body2"
              sx={{ 
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.5px",
                textTransform: "uppercase"
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h3" 
              component="div" 
              sx={{ 
                fontWeight: 800,
                fontSize: "2.5rem",
                lineHeight: 1.2,
                background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 1
              }}
            >
              {value}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: trend === "up" ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)",
                  color: trend === "up" ? "success.main" : "error.main",
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                }}
              >
                <TrendingUpIcon
                  sx={{
                    fontSize: 16,
                    mr: 0.5,
                    transform: trend === "down" ? "rotate(180deg)" : "none",
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
                  {change}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              background: `linear-gradient(135deg, ${color} 0%, ${color}DD 100%)`,
              borderRadius: 3,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 64,
              minHeight: 64,
              boxShadow: `0 8px 32px ${color}40`,
              color: "white",
              "& svg": {
                fontSize: 28
              }
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

const recentActivity = [
  {
    id: 1,
    type: "restaurant",
    title: "New restaurant added",
    description: "Mario's Italian Bistro joined the platform",
    time: "2 hours ago",
    icon: <RestaurantIcon />,
    color: "#E53935",
  },
  {
    id: 2,
    type: "anomaly",
    title: "Anomaly resolved",
    description: "Revenue drop issue at Sakura Sushi resolved",
    time: "4 hours ago",
    icon: <CheckCircleIcon />,
    color: "#4CAF50",
  },
  {
    id: 3,
    type: "alert",
    title: "New anomaly detected",
    description: "Unusual order pattern at Taco Fiesta",
    time: "6 hours ago",
    icon: <WarningIcon />,
    color: "#FB8C00",
  },
]

const topPerformers = [
  { name: "Mario's Italian Bistro", revenue: 125000, rating: 4.8, city: "New York" },
  { name: "Sakura Sushi", revenue: 98000, rating: 4.6, city: "Los Angeles" },
  { name: "Spice Garden", revenue: 87000, rating: 4.7, city: "Chicago" },
]

interface DashboardOverviewProps {
  onSectionChange?: (section: string) => void
}

export function DashboardOverview({ onSectionChange }: DashboardOverviewProps) {
  const handleQuickAction = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section)
    }
  }

  return (
    <Box>
      {/* Critical Alerts */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        <AlertTitle>System Status</AlertTitle>2 critical anomalies detected. 1 restaurant requires immediate attention.
        All systems operational.
      </Alert>

      {/* Key Metrics */}
      <Box 
        sx={{ 
          display: "grid", 
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)"
          },
          gap: 3,
          mb: 4
        }}
      >
        <StatCard
          title="Total Revenue"
          value="$422K"
          change="+12.5%"
          icon={<MoneyIcon sx={{ color: "white" }} />}
          color="#E53935"
          trend="up"
        />
        <StatCard
          title="Active Restaurants"
          value="63"
          change="+8.2%"
          icon={<RestaurantIcon sx={{ color: "white" }} />}
          color="#FB8C00"
          trend="up"
        />
        <StatCard
          title="Total Orders"
          value="4,664"
          change="+15.3%"
          icon={<PeopleIcon sx={{ color: "white" }} />}
          color="#4CAF50"
          trend="up"
        />
        <StatCard
          title="System Health"
          value="98.5%"
          change="-0.2%"
          icon={<CheckCircleIcon sx={{ color: "white" }} />}
          color="#2196F3"
          trend="down"
        />
      </Box>

      <Box 
        sx={{ 
          display: "grid", 
          gridTemplateColumns: {
            xs: "1fr",
            lg: "2fr 1fr"
          },
          gap: 3,
          mb: 4
        }}
      >
        {/* Recent Activity */}
        <Card sx={{ 
          background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 3,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
          }
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              fontWeight={700}
              sx={{
                fontSize: "1.25rem",
                background: "linear-gradient(135deg, #1976d2 0%, #1976d2CC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 3
              }}
            >
              Recent Activity
            </Typography>
            <List sx={{ "& .MuiListItem-root": { borderRadius: 2, mb: 1, "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } } }}>
              {recentActivity.map((activity, index) => (
                <Box key={activity.id}>
                  <ListItem sx={{ px: 2, py: 1.5 }}>
                    <ListItemIcon>
                      <Avatar 
                        sx={{ 
                          bgcolor: activity.color, 
                          width: 44, 
                          height: 44,
                          boxShadow: `0 8px 16px ${activity.color}30`
                        }}
                      >
                        {activity.icon}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: "1rem", mb: 0.5 }}>
                          {activity.title}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            {activity.description}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ScheduleIcon sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }} />
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                              {activity.time}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider sx={{ mx: 2, opacity: 0.6 }} />}
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card sx={{ 
          background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 3,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
          }
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              fontWeight={700}
              sx={{
                fontSize: "1.25rem",
                background: "linear-gradient(135deg, #4CAF50 0%, #4CAF50CC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 3
              }}
            >
              Top Performing Restaurants
            </Typography>
            <Box sx={{ mt: 2 }}>
              {topPerformers.map((restaurant, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="body1" fontWeight={600}>
                        {restaurant.name}
                      </Typography>
                      <Chip label={`#${index + 1}`} size="small" color="primary" />
                    </Box>
                    <Typography variant="h6" color="primary.main" fontWeight={700}>
                      ${restaurant.revenue.toLocaleString()}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <StarIcon sx={{ color: "warning.main", fontSize: 16 }} />
                        <Typography variant="body2" fontWeight={600}>
                          {restaurant.rating}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {restaurant.city}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(restaurant.revenue / 125000) * 100}
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      color="primary"
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ gridColumn: "1 / -1" }}>
          <Paper sx={{ 
            p: 3,
            background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 3,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              fontWeight={700}
              sx={{
                fontSize: "1.25rem",
                background: "linear-gradient(135deg, #ff6b35 0%, #ff4757 50%, #f7931e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 3
              }}
            >
              Quick Actions
            </Typography>
            <Box 
              sx={{ 
                display: "grid", 
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)"
                },
                gap: 2
              }}
            >
              <Card
                sx={{ 
                  cursor: "pointer", 
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": { 
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)" 
                  } 
                }}
                onClick={() => handleQuickAction("restaurants")}
              >
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #1976d2 0%, #1976d2DD 100%)",
                      borderRadius: 3,
                      p: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      boxShadow: "0 8px 32px rgba(25, 118, 210, 0.3)",
                    }}
                  >
                    <RestaurantIcon sx={{ fontSize: 32, color: "white" }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Add Restaurant
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Onboard new partner
                  </Typography>
                </CardContent>
              </Card>
              
              <Card
                sx={{ 
                  cursor: "pointer", 
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": { 
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)" 
                  } 
                }}
                onClick={() => handleQuickAction("anomalies")}
              >
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #F59E0B 0%, #F59E0BDD 100%)",
                      borderRadius: 3,
                      p: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
                    }}
                  >
                    <WarningIcon sx={{ fontSize: 32, color: "white" }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    View Anomalies
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check AI alerts
                  </Typography>
                </CardContent>
              </Card>
              
              <Card
                sx={{ 
                  cursor: "pointer", 
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": { 
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)" 
                  } 
                }}
                onClick={() => handleQuickAction("analytics")}
              >
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #10B981 0%, #10B981DD 100%)",
                      borderRadius: 3,
                      p: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    <TrendingUpIcon sx={{ fontSize: 32, color: "white" }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Analytics
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View detailed reports
                  </Typography>
                </CardContent>
              </Card>
              
              <Card
                sx={{ 
                  cursor: "pointer", 
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": { 
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)" 
                  } 
                }}
                onClick={() => handleQuickAction("settings")}
              >
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #8B5CF6 0%, #8B5CF6DD 100%)",
                      borderRadius: 3,
                      p: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3)",
                    }}
                  >
                    <PeopleIcon sx={{ fontSize: 32, color: "white" }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Manage Users
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    User administration
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        </Box>
      </Box>

   )

}
