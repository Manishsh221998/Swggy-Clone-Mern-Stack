import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Button,
  Stack,
  Divider
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, addToCart, decreaseCartItem } from '../../../redux/cartSlice';
import { useMenuItems } from "../../../hooks/useRestaurants";

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

  return (
    <>
          <Divider sx={{ my: 3 ,mx:5}} />
    
      <Container sx={{ py: 2 }}>
       <Typography sx={{mb:2.5,fontWeight:600,fontSize:'27px'}} >
     Bestseller Menu Items 
        </Typography>

        <Grid container spacing={3} sx={{ justifyContent: { xs: "center", md: "start" } }}>
          {menuItems.slice(0, 8).map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card
                sx={{
                  width: "270px",
                  height: 340,
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
                  <CardMedia
                    component="img"
                    image={`http://localhost:3001/${item.image}`}
                    alt={item.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
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
                    {item.description.slice(0,30)}...
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,mt:3}}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
                      ₹{item.price}
                    </Typography>
                    {cart[item._id] ? (
                      <Stack direction="row" spacing={1} alignItems="center" sx={{border:1,borderColor:'green',boxShadow:1,borderRadius:1}} >
                        <IconButton size="small" onClick={() => handleRemove(item._id)} >
                          <RemoveIcon fontSize="small" sx={{ color:'black' }} />
                        </IconButton>
                        <Typography sx={{color:'green',fontWeight:600}}>{cart[item._id]}</Typography>
                        <IconButton size="small" onClick={() => handleAdd(item._id)}  >
                          <AddIcon fontSize="small" sx={{ color:'black' }} />
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
      </Container>
    </>
  );
};

export default TopMenuItemsList;
