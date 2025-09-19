"use client"

import { useState, useTransition } from "react"
import { Box, Toolbar, Typography, Fade, Skeleton } from "@mui/material"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { RestaurantTableFallback } from "@/components/restaurants/restaurant-table-fallback"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { AnomalyDetection } from "@/components/anomalies/anomaly-detection"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

const sectionTitles = {
  dashboard: "Dashboard Overview",
  restaurants: "Restaurant Management",
  analytics: "Global Analytics",
  anomalies: "AI Anomaly Detection",
  settings: "Settings",
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isPending, startTransition] = useTransition()

  const handleSectionChange = (section: string) => {
    startTransition(() => {
      setActiveSection(section)
    })
  }

  const renderContent = () => {
    if (isPending) {
      return (
        <Box sx={{ p: 3 }}>
          <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 3, mb: 3 }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
            ))}
          </Box>
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
        </Box>
      )
    }

    const contentMap = {
      dashboard: (
        <Box sx={{ 
          p: 3,
          background: "transparent"
        }}>
          <DashboardOverview onSectionChange={handleSectionChange} />
        </Box>
      ),
      restaurants: (
        <Box sx={{ 
          p: 3,
          background: "transparent"
        }}>
          <RestaurantTableFallback />
        </Box>
      ),
      analytics: (
        <Box sx={{ 
          p: 3,
          background: "transparent"
        }}>
          <AnalyticsDashboard />
        </Box>
      ),
      anomalies: (
        <Box sx={{ 
          p: 3,
          background: "transparent"
        }}>
          <AnomalyDetection />
        </Box>
      ),
      settings: (
        <Box sx={{ 
          p: 3,
          background: "transparent"
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 700,
            background: "linear-gradient(135deg, #1976d2 0%, #1976d2CC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            mb: 2
          }}>
            Settings
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Settings panel coming soon...
          </Typography>
        </Box>
      )
    }

    return contentMap[activeSection as keyof typeof contentMap] || contentMap.settings
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <Box component="main" sx={{ 
        flexGrow: 1,
        position: "relative",
        overflow: "hidden"
      }}>
        <Topbar title={sectionTitles[activeSection as keyof typeof sectionTitles]} />
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Fade in={!isPending} timeout={300}>
          <Box sx={{ 
            minHeight: "calc(100vh - 64px)",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              zIndex: -1
            }
          }}>
            {renderContent()}
          </Box>
        </Fade>
      </Box>
    </Box>
  )
}
