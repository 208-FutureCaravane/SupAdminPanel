"use client"

import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
  Divider,
  Badge
} from "@mui/material"
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
  TrendingDown as TrendingDownIcon,
  Security as SecurityIcon,
  MonetizationOn as MonetizationOnIcon,
  Restaurant as RestaurantIcon
} from "@mui/icons-material"

// ---- Types ----
interface AnomalyMetric { metric: string; before: string; after: string; change: string }
interface AnomalyTimelineEvent { time: string; event: string }
interface AnomalyDetailedInfo {
  affectedMetrics: AnomalyMetric[]
  timeline: AnomalyTimelineEvent[]
  recommendations: string[]
  technicalDetails: string
  estimatedResolution: string
}
interface Anomaly {
  id: string
  type: "revenue" | "security" | "orders" | "performance"
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  restaurant: string
  city: string
  impact: string
  confidence: number
  status: "active" | "investigating" | "resolved"
  timestamp: string
  detailedInfo: AnomalyDetailedInfo
}

// ---- Helpers ----
const getSeverityColor = (severity: Anomaly["severity"]) => {
  switch (severity) {
    case "critical": return "error"
    case "high": return "warning"
    case "medium": return "info"
    case "low": return "success"
    default: return "default"
  }
}
const getStatusColor = (status: Anomaly["status"]) => {
  switch (status) {
    case "active": return "error"
    case "investigating": return "warning"
    case "resolved": return "success"
    default: return "default"
  }
}
const getTypeIcon = (type: Anomaly["type"], colorVariant: string) => {
  const props = { color: colorVariant as any }
  switch (type) {
    case "revenue": return <MonetizationOnIcon {...props} />
    case "security": return <SecurityIcon {...props} />
    case "orders": return <RestaurantIcon {...props} />
    case "performance": return <TrendingDownIcon {...props} />
    default: return <InfoIcon {...props} />
  }
}
const getChangeColor = (change: string) => {
  if (change.startsWith('-')) return 'error.main'
  if (change.startsWith('+')) return 'success.main'
  return 'text.primary'
}

// ---- Mock Data (trimmed) ----
const mockAnomalies: Anomaly[] = [
  {
    id: "a1",
    type: "revenue",
    severity: "critical",
    title: "Revenue drop detected",
    description: "Sharp 32% revenue decline vs previous 2h baseline.",
    restaurant: "Central Bistro",
    city: "Paris",
    impact: "-32% hourly revenue",
    confidence: 92,
    status: "active",
    timestamp: "2 min ago",
    detailedInfo: {
      affectedMetrics: [
        { metric: "Revenue/h", before: "$2,150", after: "$1,460", change: "-32%" },
        { metric: "Average Ticket", before: "$28.40", after: "$22.10", change: "-22%" }
      ],
      timeline: [
        { time: "09:10", event: "Baseline stable" },
        { time: "09:35", event: "Downward trend begins" },
        { time: "09:40", event: "Anomaly flagged" }
      ],
      recommendations: [
        "Check POS connectivity",
        "Verify promo configurations",
        "Review kitchen delay logs"
      ],
      technicalDetails: "Z-score 4.8 vs rolling 2h window across correlated revenue streams.",
      estimatedResolution: "~35 min (historical median)"
    }
  },
  {
    id: "a2",
    type: "security",
    severity: "high",
    title: "Suspicious login pattern",
    description: "Multiple failed privileged logins from unusual ASN.",
    restaurant: "Harbor Grill",
    city: "Lisbon",
    impact: "Potential credential stuffing risk",
    confidence: 88,
    status: "investigating",
    timestamp: "14 min ago",
    detailedInfo: {
      affectedMetrics: [
        { metric: "Failed Logins", before: "4", after: "36", change: "+800%" },
        { metric: "Unique IPs", before: "3", after: "17", change: "+466%" }
      ],
      timeline: [
        { time: "08:50", event: "Baseline auth noise" },
        { time: "09:05", event: "Spike in failed logins" },
        { time: "09:07", event: "ASN flagged" }
      ],
      recommendations: [
        "Temporarily enforce MFA challenge",
        "Geo-block offending ASN",
        "Rotate impacted service tokens"
      ],
      technicalDetails: "Entropy deviation across credential attempts exceeded 3.2 threshold.",
      estimatedResolution: "~20 min (containment)"
    }
  }
]

// ---- Component ----
export function AnomalyDetection() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>(mockAnomalies)
  const [filter, setFilter] = useState<string>("all")
  const [selected, setSelected] = useState<Anomaly | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = anomalies.filter(a => filter === "all" ? true : a.severity === filter || a.status === filter)
  const criticalCount = anomalies.filter(a => a.severity === "critical" && a.status === "active").length
  const activeCount = anomalies.filter(a => a.status === "active").length

  const openDetails = (a: Anomaly) => { setSelected(a); setOpen(true) }
  const closeDetails = () => setOpen(false)

  return (
    <Box>
      <Alert severity="error" sx={{ mb: 3 }}>
        <AlertTitle>Critical Anomalies</AlertTitle>
        {criticalCount} critical anomalies · {activeCount} active overall
      </Alert>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {[
          { key: 'all', label: 'All' },
          { key: 'critical', label: 'Critical', color: 'error' },
          { key: 'high', label: 'High', color: 'warning' },
          { key: 'active', label: 'Active', color: 'info' }
        ].map(b => (
          <Button
            key={b.key}
            size="small"
            variant={filter === b.key ? 'contained' : 'outlined'}
            color={b.color as any}
            onClick={() => setFilter(b.key)}
          >
            {b.label}
          </Button>
        ))}
      </Box>

      <Card className="glass-card" sx={{ border: '1px solid var(--border)' }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} className="brand-gradient-text" gutterBottom>
            Anomaly Feed
          </Typography>
          <List>
            {filtered.map((a, i) => (
              <Box key={a.id}>
                <ListItem sx={{ mb: 1, border: '1px solid', borderColor: `${getSeverityColor(a.severity)}.main`, borderRadius: 2 }}>
                  <ListItemIcon>
                    <Badge badgeContent={a.confidence} color={getSeverityColor(a.severity) as any}>
                      {getTypeIcon(a.type, getSeverityColor(a.severity))}
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle2" fontWeight={600}>{a.title}</Typography>
                        <Chip size="small" label={a.severity.toUpperCase()} color={getSeverityColor(a.severity) as any} />
                        <Chip size="small" variant="outlined" label={a.status.toUpperCase()} color={getStatusColor(a.status) as any} />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: .5 }}>{a.description}</Typography>
                        <Typography variant="caption" sx={{ display: 'block' }}><strong>Restaurant:</strong> {a.restaurant} · {a.city}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: .5 }}>
                          <LinearProgress variant="determinate" value={a.confidence} sx={{ width: 100, height: 6, borderRadius: 3 }} color={getSeverityColor(a.severity) as any} />
                          <Typography variant="caption">{a.confidence}%</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: .5 }}>{a.timestamp}</Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', gap: .5 }}>
                      <IconButton size="small" color="primary" onClick={() => openDetails(a)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      {a.status === 'active' && (
                        <Button size="small" variant="outlined" onClick={() => setAnomalies(prev => prev.map(x => x.id === a.id ? { ...x, status: 'investigating' } : x))}>Investigate</Button>
                      )}
                      {a.status === 'investigating' && (
                        <Button size="small" variant="contained" color="success" onClick={() => setAnomalies(prev => prev.map(x => x.id === a.id ? { ...x, status: 'resolved' } : x))}>Resolve</Button>
                      )}
                      <IconButton size="small" color="error" onClick={() => setAnomalies(prev => prev.filter(x => x.id !== a.id))}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                {i < filtered.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={closeDetails} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>Anomaly Details</Typography>
          <IconButton onClick={closeDetails}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selected && (
            <Box sx={{ display: 'grid', gap: 3 }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>{selected.title}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  <Chip size="small" label={selected.severity.toUpperCase()} color={getSeverityColor(selected.severity) as any} />
                  <Chip size="small" variant="outlined" label={selected.status.toUpperCase()} color={getStatusColor(selected.status) as any} />
                  <Chip size="small" label={`${selected.confidence}% conf.`} color={getSeverityColor(selected.severity) as any} variant="outlined" />
                </Box>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{selected.description}</Typography>
                <Typography variant="body2"><strong>Impact:</strong> {selected.impact}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: .5 }}>Restaurant: {selected.restaurant} · {selected.city}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: .5 }}>{selected.detailedInfo.technicalDetails}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: .5 }}>Estimated Resolution: {selected.detailedInfo.estimatedResolution}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>Affected Metrics</Typography>
                <Box sx={{ border: '1px solid var(--border)', borderRadius: 1, overflow: 'hidden' }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 90px', bgcolor: 'action.hover', px: 1, py: .5 }}>
                    <Typography variant="caption" fontWeight={600}>Metric</Typography>
                    <Typography variant="caption" fontWeight={600}>Before</Typography>
                    <Typography variant="caption" fontWeight={600}>After</Typography>
                    <Typography variant="caption" fontWeight={600}>Change</Typography>
                  </Box>
                  {selected.detailedInfo.affectedMetrics.map((m,i) => {
                    const changeColor = getChangeColor(m.change)
                    return (
                      <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 90px', px: 1, py: .75, borderTop: '1px solid var(--border)', alignItems: 'center' }}>
                        <Typography variant="caption" fontWeight={500}>{m.metric}</Typography>
                        <Typography variant="caption" color="text.secondary">{m.before}</Typography>
                        <Typography variant="caption" color="text.secondary">{m.after}</Typography>
                        <Typography variant="caption" fontWeight={600} sx={{ color: changeColor }}>{m.change}</Typography>
                      </Box>
                    )
                  })}
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>Timeline</Typography>
                  <Box sx={{ display: 'grid', gap: 1 }}>
                    {selected.detailedInfo.timeline.map((t,i) => (
                      <Box key={i} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                        <Chip size="small" label={t.time} variant="outlined" sx={{ minWidth: 64 }} />
                        <Typography variant="caption" sx={{ mt: .4 }}>{t.event}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>Recommendations</Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2 }}>
                    {selected.detailedInfo.recommendations.map((r,i) => (
                      <Typography key={i} component="li" variant="caption" sx={{ mb: .5 }}>{r}</Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {selected && (
            <Box sx={{ mr: 'auto', display: 'flex', gap: 1 }}>
              {selected.status === 'active' && (
                <Button aria-label="Mark anomaly as investigating" size="small" variant="outlined" onClick={() => setAnomalies(prev => prev.map(x => x.id === selected.id ? { ...x, status: 'investigating' } : x))}>Investigate</Button>
              )}
              {selected.status === 'investigating' && (
                <>
                  <Button aria-label="Resolve anomaly" size="small" variant="contained" color="success" onClick={() => setAnomalies(prev => prev.map(x => x.id === selected.id ? { ...x, status: 'resolved' } : x))}>Resolve</Button>
                  <Button aria-label="Revert anomaly to active" size="small" variant="outlined" color="warning" onClick={() => setAnomalies(prev => prev.map(x => x.id === selected.id ? { ...x, status: 'active' } : x))}>Reopen</Button>
                </>
              )}
              {selected.status === 'resolved' && (
                <Button aria-label="Reopen resolved anomaly" size="small" variant="outlined" color="warning" onClick={() => setAnomalies(prev => prev.map(x => x.id === selected.id ? { ...x, status: 'investigating' } : x))}>Reopen</Button>
              )}
            </Box>
          )}
          <Button onClick={closeDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AnomalyDetection
