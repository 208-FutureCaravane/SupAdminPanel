"use client"

import type React from "react"

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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Paper,
  Grid,
} from "@mui/material"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  Restaurant as RestaurantIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
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
  phone?: string
  email?: string
  address?: string
  manager?: string
  menu?: Array<{ category: string; items: Array<{ name: string; price: number; description: string }> }>
}

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
    phone: "+1 (555) 123-4567",
    email: "contact@mariosbistro.com",
    address: "123 Little Italy St, New York, NY 10013",
    manager: "Giuseppe Mario",
    menu: [
      {
        category: "Pasta",
        items: [
          {
            name: "Spaghetti Carbonara",
            price: 18,
            description: "Classic Roman pasta with eggs, cheese, and pancetta",
          },
          { name: "Fettuccine Alfredo", price: 16, description: "Creamy pasta with parmesan cheese" },
        ],
      },
      {
        category: "Pizza",
        items: [
          { name: "Margherita", price: 14, description: "Fresh tomato, mozzarella, and basil" },
          { name: "Pepperoni", price: 16, description: "Classic pepperoni with mozzarella cheese" },
        ],
      },
    ],
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
    phone: "+1 (555) 987-6543",
    email: "info@sakurasushi.com",
    address: "456 Sunset Blvd, Los Angeles, CA 90028",
    manager: "Hiroshi Tanaka",
    menu: [
      {
        category: "Sushi Rolls",
        items: [
          { name: "California Roll", price: 12, description: "Crab, avocado, and cucumber" },
          { name: "Spicy Tuna Roll", price: 14, description: "Spicy tuna with cucumber" },
        ],
      },
    ],
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

export function RestaurantTableFallback() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null)
  const [viewingRestaurant, setViewingRestaurant] = useState<Restaurant | null>(null)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    cuisine: "",
    partner: "",
    status: "active" as const,
    phone: "",
    email: "",
    address: "",
    manager: "",
  })

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant)
    setFormData({
      name: restaurant.name,
      city: restaurant.city,
      cuisine: restaurant.cuisine,
      partner: restaurant.partner,
      status: restaurant.status,
      phone: restaurant.phone || "",
      email: restaurant.email || "",
      address: restaurant.address || "",
      manager: restaurant.manager || "",
    })
    setOpenDialog(true)
  }

  const handleViewDetails = (restaurant: Restaurant) => {
    setViewingRestaurant(restaurant)
    setOpenDetailsDialog(true)
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
      phone: "",
      email: "",
      address: "",
      manager: "",
    })
    setOpenDialog(true)
  }

  const handleSave = () => {
    if (editingRestaurant) {
      setRestaurants(restaurants.map((r) => (r.id === editingRestaurant.id ? { ...r, ...formData } : r)))
    } else {
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedRestaurants = restaurants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" fontWeight={600}>
              Restaurant Management
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={{ borderRadius: 2 }}>
              Add Restaurant
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Restaurant Name</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Cuisine</TableCell>
                  <TableCell>Partner Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell align="right">Orders</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRestaurants.map((restaurant) => (
                  <TableRow key={restaurant.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <RestaurantIcon color="primary" />
                        <Typography variant="body2" fontWeight={600}>
                          {restaurant.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{restaurant.city}</TableCell>
                    <TableCell>{restaurant.cuisine}</TableCell>
                    <TableCell>
                      <Chip
                        label={restaurant.partner}
                        size="small"
                        color={restaurant.partner === "Premium Partner" ? "primary" : "default"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={restaurant.status}
                        size="small"
                        color={getStatusColor(restaurant.status) as any}
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell align="right">${restaurant.revenue.toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                        <Typography variant="body2">{restaurant.rating}</Typography>
                        <Typography variant="body2" color="warning.main">
                          ★
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{restaurant.orders}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="View Details">
                          <IconButton size="small" onClick={() => handleViewDetails(restaurant)}>
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Restaurant">
                          <IconButton size="small" onClick={() => handleEdit(restaurant)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Restaurant">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(restaurant.id)}
                            sx={{ color: "error.main" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={restaurants.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingRestaurant ? "Edit Restaurant" : "Add New Restaurant"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Restaurant Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Manager Name"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Cuisine Type"
                  value={formData.cuisine}
                  onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingRestaurant ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" fontWeight={600}>
              {viewingRestaurant?.name} - Details
            </Typography>
            <IconButton onClick={() => setOpenDetailsDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {viewingRestaurant && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Restaurant Information
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <RestaurantIcon color="primary" />
                        <Typography variant="body1" fontWeight={600}>
                          {viewingRestaurant.name}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LocationIcon color="action" />
                        <Typography variant="body2">
                          {viewingRestaurant.address ||
                            `${viewingRestaurant.city}, ${viewingRestaurant.cuisine} Cuisine`}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PhoneIcon color="action" />
                        <Typography variant="body2">{viewingRestaurant.phone || "Phone not provided"}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <EmailIcon color="action" />
                        <Typography variant="body2">{viewingRestaurant.email || "Email not provided"}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                        <Chip
                          label={viewingRestaurant.partner}
                          color={viewingRestaurant.partner === "Premium Partner" ? "primary" : "default"}
                          variant="outlined"
                        />
                        <Chip
                          label={viewingRestaurant.status}
                          color={getStatusColor(viewingRestaurant.status) as any}
                          variant="filled"
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Performance Metrics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography variant="h4" color="primary.main" fontWeight={700}>
                            ${viewingRestaurant.revenue.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Revenue
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography variant="h4" color="warning.main" fontWeight={700}>
                            {viewingRestaurant.rating}★
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Rating
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography variant="h4" color="success.main" fontWeight={700}>
                            {viewingRestaurant.orders}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Orders
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Menu
                    </Typography>
                    {viewingRestaurant.menu && viewingRestaurant.menu.length > 0 ? (
                      viewingRestaurant.menu.map((category, index) => (
                        <Box key={index} sx={{ mb: 3 }}>
                          <Typography variant="h6" color="primary.main" gutterBottom>
                            {category.category}
                          </Typography>
                          <TableContainer component={Paper} variant="outlined">
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Item</TableCell>
                                  <TableCell>Description</TableCell>
                                  <TableCell align="right">Price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {category.items.map((item, itemIndex) => (
                                  <TableRow key={itemIndex}>
                                    <TableCell>
                                      <Typography variant="body2" fontWeight={600}>
                                        {item.name}
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                      <Typography variant="body2" fontWeight={600}>
                                        ${item.price}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Menu information not available
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}
