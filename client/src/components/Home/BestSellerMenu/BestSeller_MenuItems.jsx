import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, addToCart, decreaseCartItem } from '../../../redux/cartSlice';
import { useMenuItems } from "../../../hooks/useRestaurants";
import "@fontsource/poppins";
import { motion } from "framer-motion";
import { BaseUrlImage } from "../../../api/endpoints";

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

const TopMenuItemsList = () => {
  const { data } = useMenuItems();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const menuItems = data?.data?.data || [];
console.log(menuItems)
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAdd = (id) => {
    dispatch(addToCart({ menuItemId: id, quantity: 1 }));
  };

  const handleRemove = (id) => {
    dispatch(decreaseCartItem({ menuItemId: id }));
  };
  
console.log(`${BaseUrlImage}/${item?.image?.replace(/\\/g, "/")}`);

  return (
    <>
      <Divider sx={{ my: 1.5, mx: 3 }} />

      <Container sx={{ py: 2 }} id="#bestSeller">
        <Typography
          sx={{
            mb: 2.5,
            fontWeight: 600,
            fontSize: '26px',
            fontFamily: '"Poppins", sans-serif',
            background: "linear-gradient(to right, green, black)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Bestseller Menu Items
        </Typography>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Grid container spacing={3} sx={{ justifyContent: { xs: "center", md: "start" } }}>
            {menuItems?.slice(0, 8).map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <Card
                  sx={{
                    width: "270px",
                    height: 320,
                    borderRadius: 4,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "0.3s",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <Box sx={{ width: "100%", height: 175, overflow: "hidden" }}>
                    <Box sx={{ width: "100%", height: "100%" }}>
                      <img
  src={`${BaseUrlImage}/${item?.image?.replace(/\\/g, "/")}`}
  alt={item.name}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }}
/>

                    </Box>
                  </Box>

                  <CardContent sx={{ p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      {item.isVeg ? <VegIcon /> : <NonVegIcon />}
                      <Typography variant="subtitle1" fontWeight={600} noWrap>
                        {item.name}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="body2"
                      sx={{ color: "#888", fontSize: "0.85rem", mb: 1 }}
                    >
                      {item.description.slice(0, 30)}...
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
                        ₹{item.price}
                      </Typography>
                      {cart[item._id] ? (
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ border: 1, borderColor: 'orangered', boxShadow: 1, borderRadius: 1 }} >
                          <IconButton size="small" onClick={() => handleRemove(item._id)} >
                            <RemoveIcon fontSize="small" sx={{ color: 'orangered' }} />
                          </IconButton>
                          <Typography sx={{ color: 'black', fontWeight: 600 }}>{cart[item._id]}</Typography>
                          <IconButton size="small" onClick={() => handleAdd(item._id)}  >
                            <AddIcon fontSize="small" sx={{ color: 'orangered' }} />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleAdd(item._id)}
                          sx={{
                            textTransform: 'none',
                            px: 2,
                            color: 'green',
                            borderColor: 'green',
                            fontWeight: 600,
                          }}
                        >
                          ADD
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </>
  );
};

export default TopMenuItemsList;
