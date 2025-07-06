import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  IconButton,
  Button,
  Stack,
  TextField,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, addToCart, decreaseCartItem } from "../../redux/cartSlice";
import { useAllRestaurants, useMenuCategories, useMenuItems } from "../../hooks/useRestaurants";
import Select from "react-select";
import { motion } from "framer-motion";

const VegIcon = () => (
  <Box component="span" sx={{
    display: 'inline-block', width: 16, height: 16,
    border: '2px solid green', borderRadius: '2px', position: 'relative', mr: 1,
    '&::after': {
      content: '""', position: 'absolute', top: '50%', left: '50%',
      width: 6, height: 6, backgroundColor: 'green',
      borderRadius: '50%', transform: 'translate(-50%, -50%)'
    }
  }} />
);

const NonVegIcon = () => (
  <Box component="span" sx={{
    display: 'inline-block', width: 16, height: 16,
    border: '2px solid red', borderRadius: '2px', position: 'relative', mr: 1,
    '&::after': {
      content: '""', position: 'absolute', top: '50%', left: '50%',
      width: 6, height: 6, backgroundColor: 'red',
      borderRadius: '50%', transform: 'translate(-50%, -50%)'
    }
  }} />
);

const MenuItems = () => {
  const { data } = useMenuItems();
  const { data: menuCategory } = useMenuCategories();
  const menuCategoryData = menuCategory?.data?.data || [];
  const { data: restaurent } = useAllRestaurants();
  const restaurentData = restaurent?.data?.data || [];

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const allItems = data?.data?.data || [];

  const [search, setSearch] = useState("");
  const [vegFilter, setVegFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAdd = (id) => dispatch(addToCart({ menuItemId: id, quantity: 1 }));
  const handleRemove = (id) => dispatch(decreaseCartItem({ menuItemId: id }));

  const getCategoryId = (item) => typeof item.categoryId === "string" ? item.categoryId : item.categoryId?.$oid;

  const categoryOptions = menuCategoryData.map(cat => ({ label: cat.name, value: cat._id }));
  const restaurantOptions = restaurentData.map(rest => ({ label: rest.name, value: rest._id }));

  const priceOptions = [
    { label: "Price: Low to High", value: "lowToHigh" },
    { label: "Price: High to Low", value: "highToLow" },
  ];

  let filteredItems = allItems.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.price.toString().includes(search);
    const matchVeg = vegFilter === "all" || (vegFilter === "veg" ? item.isVeg : !item.isVeg);
    const matchCategory = !selectedCategory || getCategoryId(item) === selectedCategory;
    const matchRestaurant = !selectedRestaurant || item.restaurantId === selectedRestaurant;

    return matchSearch && matchVeg && matchCategory && matchRestaurant;
  });

  if (sortOption === "lowToHigh") {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (sortOption === "highToLow") {
    filteredItems.sort((a, b) => b.price - a.price);
  }

  const itemsToShow = filteredItems.slice(0, visibleCount);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Stack spacing={2} mb={4}>
        <TextField
          label="Search menu item or price"
          fullWidth
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root.Mui-focused': { '& > fieldset': { borderColor: 'black' } } }}
        />

        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={2} 
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          sx={{ 
            flexWrap: { xs: 'nowrap', sm: 'wrap', lg: 'nowrap' },
            gap: { xs: 2, sm: 2, lg: 2 }
          }}
        >
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              width: { xs: '100%', sm: 'auto', lg: 'auto' },
              order: { xs: 1, sm: 1, lg: 1 }
            }}
          >
            <Chip label="All" color={vegFilter === "all" ? 'warning' : "default"} onClick={() => setVegFilter("all")} />
            <Chip label="Veg" color={vegFilter === "veg" ? "success" : "default"} onClick={() => setVegFilter("veg")} />
            <Chip label="Non-Veg" color={vegFilter === "nonveg" ? "error" : "default"} onClick={() => setVegFilter("nonveg")} />
          </Stack>

          <Stack 
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              width: { xs: '100%', lg: 'auto' },
              flexGrow: { lg: 1 },
              justifyContent: { lg: 'flex-end' },
              order: { xs: 2, sm: 2, lg: 2 }
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: 200, lg: 200 } }}>
              <Select
                options={[{ label: "All Restaurants", value: null }, ...restaurantOptions]}
                placeholder="Select Restaurant"
                value={restaurantOptions.find(opt => opt.value === selectedRestaurant) || null}
                onChange={(opt) => setSelectedRestaurant(opt?.value || null)}
                isClearable
                styles={{ 
                  control: (base, state) => ({ 
                    ...base, 
                    borderColor: state.isFocused ? "black" : base.borderColor, 
                    boxShadow: "none", 
                    minHeight: 36 
                  }), 
                  valueContainer: base => ({ ...base, padding: '0 8px' }), 
                  indicatorsContainer: base => ({ ...base, height: 36 })
                }}
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 200, lg: 200 } }}>
              <Select
                options={[{ label: "All Categories", value: null }, ...categoryOptions]}
                placeholder="Select Category"
                value={categoryOptions.find(opt => opt.value === selectedCategory) || null}
                onChange={(opt) => setSelectedCategory(opt?.value || null)}
                isClearable
                styles={{ 
                  control: (base, state) => ({ 
                    ...base, 
                    borderColor: state.isFocused ? "black" : base.borderColor, 
                    boxShadow: "none", 
                    minHeight: 36 
                  }), 
                  valueContainer: base => ({ ...base, padding: '0 8px' }), 
                  indicatorsContainer: base => ({ ...base, height: 36 })
                }}
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 200, lg: 200 } }}>
              <Select
                options={priceOptions}
                placeholder="Sort by Price"
                value={priceOptions.find(opt => opt.value === sortOption) || null}
                onChange={(opt) => setSortOption(opt?.value || null)}
                isClearable
                styles={{ 
                  control: (base, state) => ({ 
                    ...base, 
                    borderColor: state.isFocused ? "black" : base.borderColor, 
                    boxShadow: "none", 
                    minHeight: 36 
                  }), 
                  valueContainer: base => ({ ...base, padding: '0 8px' }), 
                  indicatorsContainer: base => ({ ...base, height: 36 })
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: { xs: 'center', lg: 'start' } }}>
        {itemsToShow.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <Card sx={{ 
                height: { xs: 'auto', sm: 310 }, 
                width: { xs: '100%', sm: 'auto', md: 270 }, 
                maxWidth: { xs: 400, sm: 'none' },
                borderRadius: 3, 
                display: "flex", 
                flexDirection: "column",
                margin: '0 auto'
              }}>
                <CardMedia
                  component="img"
                  image={`http://localhost:3001/${item.image}`}
                  alt={item.name}
                  sx={{ height: 160 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {item.isVeg ? <VegIcon /> : <NonVegIcon />}
                    <Typography variant="subtitle1" fontWeight={600} noWrap>{item.name}</Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ my: 1 }}>{item.description.slice(0, 40)}...</Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                    <Typography fontWeight={600}>₹{item.price}</Typography>
                    {cart[item._id] ? (
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ border: 1, borderColor: 'green', borderRadius: 1, px: 1 }}>
                        <IconButton size="small" onClick={() => handleRemove(item._id)}><RemoveIcon fontSize="small" /></IconButton>
                        <Typography>{cart[item._id]}</Typography>
                        <IconButton size="small" onClick={() => handleAdd(item._id)}><AddIcon fontSize="small" /></IconButton>
                      </Stack>
                    ) : (
                      <Button variant="outlined" size="small" onClick={() => handleAdd(item._id)} sx={{ textTransform: "none", color: "green", borderColor: "green" }}>
                        ADD
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {visibleCount < filteredItems.length && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button variant="contained" sx={{bgcolor:'black',color:'white',borderRadius:2,fontWeight:500}} onClick={() => setVisibleCount(prev => prev + 8)}>Load More</Button>
        </Box>
      )}
    </Container>
  );
};

export default MenuItems;