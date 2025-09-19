"use client"

import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material"
import { DataGrid, type GridColDef, GridActionsCellItem, type GridRowParams } from "@mui/x-data-grid"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  Restaurant as RestaurantIcon,
} from "@mui/icons-material"

interface Restaurant {
  id: number
  name: string
  city: string
  cuisine: string
  partner: string
  status: "active" | "inactive" | "pending"
  revenue: number
  rating: number
  orders: number
}

// Mock data for demonstration
const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Mario's Italian Bistro",
    city: "New York",
    cuisine: "Italian",
    partner: "Premium Partner",
    status: "active",
    revenue: 125000,
    rating: 4.8,
    orders: 1250,
  },
  {
    id: 2,
    name: "Sakura Sushi",
    city: "Los Angeles",
    cuisine: "Japanese",
    partner: "Standard Partner",
    status: "active",
    revenue: 98000,
    rating: 4.6,
    orders: 890,
  },
  {
    id: 3,
    name: "Taco Fiesta",
    city: "Austin",
    cuisine: "Mexican",
    partner: "Premium Partner",
    status: "pending",
    revenue: 67000,
    rating: 4.3,
    orders: 567,
  },
  {
    id: 4,
    name: "Le Petit Café",
    city: "San Francisco",
    cuisine: "French",
    partner: "Standard Partner",
    status: "inactive",
    revenue: 45000,
    rating: 4.1,
    orders: 234,
  },
  {
    id: 5,
    name: "Spice Garden",
    city: "Chicago",
    cuisine: "Indian",
    partner: "Premium Partner",
    status: "active",
    revenue: 87000,
    rating: 4.7,
    orders: 723,
  },
]

export function RestaurantTable() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    cuisine: "",
    partner: "",
    status: "active" as const,
  })

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant)
    setFormData({
      name: restaurant.name,
      city: restaurant.city,
      cuisine: restaurant.cuisine,
      partner: restaurant.partner,
      status: restaurant.status,
    })
    setOpenDialog(true)
  }

  const handleDelete = (id: number) => {
    setRestaurants(restaurants.filter((r) => r.id !== id))
  }

  const handleAdd = () => {
    setEditingRestaurant(null)
    setFormData({
      name: "",
      city: "",
      cuisine: "",
      partner: "",
      status: "active",
    })
    setOpenDialog(true)
  }

  const handleSave = () => {
    if (editingRestaurant) {
      // Update existing restaurant
      setRestaurants(restaurants.map((r) => (r.id === editingRestaurant.id ? { ...r, ...formData } : r)))
    } else {
      // Add new restaurant
      const newRestaurant: Restaurant = {
        id: Math.max(...restaurants.map((r) => r.id)) + 1,
        ...formData,
        revenue: 0,
        rating: 0,
        orders: 0,
      }
      setRestaurants([...restaurants, newRestaurant])
    }
    setOpenDialog(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "inactive":
        return "error"
      case "pending":
        return "warning"
      default:
        return "default"
    }
  }

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Restaurant Name",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <RestaurantIcon color="primary" />
          <Typography variant="body2" fontWeight={600}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "city",
      headerName: "City",
      width: 120,
    },
    {
      field: "cuisine",
      headerName: "Cuisine",
      width: 120,
    },
    {
      field: "partner",
      headerName: "Partner Type",
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === "Premium Partner" ? "primary" : "default"}
          variant="outlined"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color={getStatusColor(params.value) as any} variant="filled" />
      ),
    },
    {
      field: "revenue",
      headerName: "Revenue",
      width: 120,
      type: "number",
      valueFormatter: (params) => `$${params.value.toLocaleString()}`,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 80,
      type: "number",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="body2">{params.value}</Typography>
          <Typography variant="body2" color="warning.main">
            ★
          </Typography>
        </Box>
      ),
    },
    {
      field: "orders",
      headerName: "Orders",
      width: 100,
      type: "number",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key="view"
          icon={
            <Tooltip title="View Details">
              <ViewIcon />
            </Tooltip>
          }
          label="View"
          onClick={() => console.log("View", params.row)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={
            <Tooltip title="Edit Restaurant">
              <EditIcon />
            </Tooltip>
          }
          label="Edit"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={
            <Tooltip title="Delete Restaurant">
              <DeleteIcon />
            </Tooltip>
          }
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
          sx={{ color: "error.main" }}
        />,
      ],
    },
  ]

  return (
    <Box>
      <Card className="glass-card" sx={{ border: "1px solid var(--border)", boxShadow: "0 8px 32px rgba(255, 107, 53, 0.1)" }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography 
              variant="h5" 
              fontWeight={700}
              className="brand-gradient-text"
              sx={{
                /* gradient now handled by utility class */
              }}
            >
              Restaurant Management
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={handleAdd} 
              sx={{ 
                borderRadius: 2,
                background: "var(--gradient-primary)",
                color: "#fff",
                fontWeight: 600,
                px: 3,
                py: 1.5,
                boxShadow: "0 4px 20px rgba(255, 107, 53, 0.3)",
                "&:hover": {
                  background: "var(--gradient-accent)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(255, 107, 53, 0.4)",
                }
              }}
            >
              Add Restaurant
            </Button>
          </Box>

          <Box sx={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={restaurants}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--card)",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "var(--muted)",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--foreground)",
                  fontWeight: 600,
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid var(--border)",
                  color: "var(--card-foreground)",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "var(--muted)",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "1px solid var(--border)",
                  backgroundColor: "var(--card)",
                },
                "& .MuiCheckbox-root.Mui-checked": {
                  color: "var(--primary)",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingRestaurant ? "Edit Restaurant" : "Add New Restaurant"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Restaurant Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Cuisine Type"
              value={formData.cuisine}
              onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Partner Type</InputLabel>
              <Select
                value={formData.partner}
                label="Partner Type"
                onChange={(e) => setFormData({ ...formData, partner: e.target.value })}
              >
                <MenuItem value="Standard Partner">Standard Partner</MenuItem>
                <MenuItem value="Premium Partner">Premium Partner</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingRestaurant ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
