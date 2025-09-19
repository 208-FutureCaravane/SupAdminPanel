"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
} from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp as TrendingUpIcon,
  Restaurant as RestaurantIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
} from "@mui/icons-material"

// Mock analytics data
const revenueByCity = [
  { city: "New York", revenue: 125000, orders: 1250, restaurants: 15 },
  { city: "Los Angeles", revenue: 98000, orders: 890, restaurants: 12 },
  { city: "Chicago", revenue: 87000, orders: 723, restaurants: 10 },
  { city: "Austin", revenue: 67000, orders: 567, restaurants: 8 },
  { city: "San Francisco", revenue: 45000, orders: 234, restaurants: 6 },
]

const cuisineData = [
  { name: "Italian", value: 28, color: "#E53935" },
  { name: "Japanese", value: 22, color: "#FB8C00" },
  { name: "Mexican", value: 18, color: "#4CAF50" },
  { name: "French", value: 15, color: "#2196F3" },
  { name: "Indian", value: 12, color: "#9C27B0" },
  { name: "Other", value: 5, color: "#607D8B" },
]

const monthlyTrends = [
  { month: "Jan", revenue: 85000, orders: 850, partners: 45 },
  { month: "Feb", revenue: 92000, orders: 920, partners: 48 },
  { month: "Mar", revenue: 98000, orders: 980, partners: 52 },
  { month: "Apr", revenue: 105000, orders: 1050, partners: 55 },
  { month: "May", revenue: 112000, orders: 1120, partners: 58 },
  { month: "Jun", revenue: 125000, orders: 1250, partners: 62 },
]

const partnerPerformance = [
  { type: "Premium Partners", revenue: 280000, count: 35, avgRating: 4.7 },
  { type: "Standard Partners", revenue: 142000, count: 28, avgRating: 4.3 },
]

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  color: string
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  return (
    <Card
      className="glass-card"
      sx={{
        position: 'relative',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 20px rgba(255,107,53,0.08)',
        backdropFilter: 'blur(12px)',
        transition: 'all .35s cubic-bezier(.4,0,.2,1)',
        overflow: 'hidden',
        minHeight: 150,
        display: 'flex',
        '&:before': {
          content: '""',
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)`,
            opacity: 0,
            transition: 'opacity .35s'
        },
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 10px 34px -4px rgba(255,107,53,0.25)',
          '&:before': { opacity: 1 }
        }
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } , width:'100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: '.08em',
                fontWeight: 600,
                color: 'var(--muted-foreground)',
                textTransform: 'uppercase'
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mt: .5,
                fontWeight: 700,
                fontSize: { xs: '1.75rem', lg: '2rem' },
                color: 'var(--foreground)'
              }}
            >
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUpIcon sx={{ color: '#10B981', fontSize: 18, mr: .5 }} />
              <Typography variant="body2" sx={{ color: '#10B981', fontWeight: 600 }}>
                {change}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flexShrink: 0,
              background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
              borderRadius: 3,
              p: 1.75,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 6px 18px -4px ${color}88`
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export function AnalyticsDashboard() {
  const [cityFilter, setCityFilter] = useState("all")
  const [cuisineFilter, setCuisineFilter] = useState("all")
  const [partnerFilter, setPartnerFilter] = useState("all")

  const cities = ["all", ...revenueByCity.map((item) => item.city)]
  const cuisines = ["all", ...cuisineData.map((item) => item.name)]
  const partners = ["all", "Premium Partners", "Standard Partners"]

  return (
    <Box>
      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Analytics Filters
        </Typography>
        <Box sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit,minmax(220px,1fr))' }
        }}>
          <FormControl fullWidth size="small">
            <InputLabel>City</InputLabel>
            <Select value={cityFilter} label="City" onChange={(e) => setCityFilter(e.target.value)}>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city === "all" ? "All Cities" : city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Cuisine</InputLabel>
            <Select value={cuisineFilter} label="Cuisine" onChange={(e) => setCuisineFilter(e.target.value)}>
              {cuisines.map((cuisine) => (
                <MenuItem key={cuisine} value={cuisine}>
                  {cuisine === "all" ? "All Cuisines" : cuisine}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Partner Type</InputLabel>
            <Select value={partnerFilter} label="Partner Type" onChange={(e) => setPartnerFilter(e.target.value)}>
              {partners.map((partner) => (
                <MenuItem key={partner} value={partner}>
                  {partner === "all" ? "All Partners" : partner}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Key Metrics - improved responsive grid */}
      <Box
        sx={{
          mb: 4,
          display: 'grid',
          gap: { xs: 2, sm: 2.5, lg: 3 },
          gridTemplateColumns: {
            xs: 'repeat(auto-fill,minmax(210px,1fr))',
            sm: 'repeat(auto-fill,minmax(230px,1fr))',
            md: 'repeat(auto-fill,minmax(240px,1fr))',
            lg: 'repeat(4,minmax(240px,1fr))'
          },
          alignItems: 'stretch'
        }}
      >
        <StatCard
          title="Total Revenue"
          value="$422K"
          change="+12.5%"
          icon={<MoneyIcon sx={{ color: 'white' }} />}
          color="#E53935"
        />
        <StatCard
          title="Active Restaurants"
          value="63"
          change="+8.2%"
          icon={<RestaurantIcon sx={{ color: 'white' }} />}
          color="#FB8C00"
        />
        <StatCard
          title="Total Orders"
          value="4,664"
          change="+15.3%"
          icon={<PeopleIcon sx={{ color: 'white' }} />}
          color="#4CAF50"
        />
        <StatCard
          title="Avg Rating"
          value="4.6"
          change="+0.2"
          icon={<TrendingUpIcon sx={{ color: 'white' }} />}
          color="#2196F3"
        />
      </Box>

      {/* Charts Layout */}
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, mb: 3 }}>
        <Box>
          <Card className="glass-card" sx={{ 
            border: "1px solid var(--border)",
            boxShadow: "0 8px 32px rgba(255, 107, 53, 0.1)" 
          }}>
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom 
                fontWeight={600}
                sx={{ color: "var(--foreground)" }}
              >
                Revenue by City
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByCity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="city" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        color: "var(--card-foreground)"
                      }}
                    />
                    <Bar dataKey="revenue" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
  </Box>
  <Box>
          <Card className="glass-card" sx={{ 
            border: "1px solid var(--border)",
            boxShadow: "0 8px 32px rgba(255, 107, 53, 0.1)" 
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Cuisine Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cuisineData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {cuisineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                {cuisineData.map((item) => (
                  <Chip
                    key={item.name}
                    label={`${item.name} (${item.value}%)`}
                    size="small"
                    sx={{ backgroundColor: item.color, color: "white" }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, mb: 3 }}>
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Monthly Revenue Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#FB8C00"
                      fill="#FB8C00"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
  </Box>
  <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Partner Performance
              </Typography>
              <Box sx={{ mt: 2 }}>
                {partnerPerformance.map((partner, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {partner.type}
                      </Typography>
                      <Chip
                        label={`${partner.count} partners`}
                        size="small"
                        color={index === 0 ? "primary" : "default"}
                      />
                    </Box>
                    <Typography variant="h6" color="primary.main" fontWeight={700}>
                      ${partner.revenue.toLocaleString()}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Avg Rating:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {partner.avgRating} ★
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Order Volume Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#4CAF50"
                      strokeWidth={3}
                      dot={{ fill: "#4CAF50", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
      </Box>
    </Box>
  )
}
