// --- Imports ---
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Avatar,
  Grid,
  Container,
  Divider,
  CardMedia,
  useMediaQuery,
  useTheme,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addToCart,
  decreaseCartItem,
  removeCartItem,
  clearCart,
  placeOrder,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUser";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { BaseUrlImage } from "../../api/endpoints";

const GST_PERCENTAGE = 5;

const CartPage = () => {
  const navigate = useNavigate();
  const { data } = useUserProfile();
  const user = data?.data?.data;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.fullItems);
  const cartQuantityMap = useSelector((state) => state.cart.items);
  const restaurantData = useSelector((state) => state.cart.restaurantData);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const updateQuantity = (menuItemId, newQuantity) => {
    if (newQuantity === 0) {
      dispatch(removeCartItem({ cartItemId: menuItemId }));
    } else if (newQuantity > (cartQuantityMap[menuItemId] || 0)) {
      dispatch(addToCart({ menuItemId, quantity: 1 }));
    } else {
      dispatch(decreaseCartItem({ menuItemId }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const itemTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const gstAmount = (itemTotal * GST_PERCENTAGE) / 100;
  const totalWithGst = Math.round(itemTotal + gstAmount);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleCheckout = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded || typeof window.Razorpay === "undefined") {
      alert("Failed to load Razorpay SDK. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_hxRh7jpbnIQk1q",
      amount: totalWithGst * 100,
      currency: "INR",
      name: restaurantData?.name || "Restaurant",
      description: "Order Payment",
      handler: async function () {
        setShowConfetti(true);
        setLoading(true);

        await dispatch(placeOrder());
        localStorage.setItem("orderSuccess", "true");

        setTimeout(() => {
          setShowConfetti(false);
          setLoading(false);
          navigate("/");
        }, 2000);
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.mobile,
      },
      notes: {
        restaurant: restaurantData?.name,
      },
      theme: {
        color: "#0f8a65",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const VegNonVegIcon = ({ isVeg }) => (
    <Box
      sx={{
        width: 16,
        height: 16,
        border: `2px solid ${isVeg ? "#0f8a65" : "#e23744"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "2px",
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          backgroundColor: isVeg ? "#0f8a65" : "#e23744",
          borderRadius: "50%",
        }}
      />
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 2,px: isMobile ? 1 : 3 }}>
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={300} />}

      {/* --- Restaurant Info --- */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 2,
          boxShadow: "none",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: isMobile ? 2 : 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: isMobile ? 1.5 : 3 }}>
        {restaurantData?.image && (
    <CardMedia
      component="img"
      image={`${BaseUrlImage}/${restaurantData.image.replace(/\\/g, "/")}`}
      alt={restaurantData?.name || "Restaurant"}
      sx={{
        width: isMobile ? 60 : 120,
        height: isMobile ? 60 : 120,
        borderRadius: 2,
        objectFit: "cover",
      }}
    />
  )}
            <Box>
              <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight={600}>
                {restaurantData?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {restaurantData?.address?.city}, {restaurantData?.address?.state}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* --- Cart Items --- */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 2,
          boxShadow: "none",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {cartItems.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 2,
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Looks like you haven't added any items yet
              </Typography>
            </Box>
          ) : (
            cartItems.map((item, index) => (
              <Box key={item.menuItemId}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    p: isMobile ? 1.5 : 3,
                    backgroundColor: index % 2 === 0 ? "white" : "rgba(0,0,0,0.02)",
                  }}
                >
                  <Grid item xs={7} sm={8}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar
                        variant="rounded"
                        src={`${BaseUrlImage}/${item?.image.replace(/\\/g, "/")}`}
                        alt={item.name}
                        sx={{
                          width: isMobile ? 48 : 56,
                          height: isMobile ? 48 : 56,
                          borderRadius: 1.5,
                        }}
                      />
                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                          <VegNonVegIcon isVeg={item.isVeg} />
                          <Typography variant="subtitle1" fontWeight={500} noWrap>
                            {item.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          ₹{item.price}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={5} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                        sx={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 1.5}}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography fontWeight={550} sx={{ minWidth: 20, textAlign: "center" }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                        sx={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 1.5 }}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => updateQuantity(item._id, 0)}
                        sx={{ color: "red"}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>

                {index < cartItems.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </CardContent>
      </Card>

      {/* --- Billing Summary --- */}
      {cartItems.length > 0 && (
        <Card
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: "none",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: isMobile ? 2 : 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Bill Details
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography color="text.secondary">Item Total</Typography>
              <Typography color="text.secondary">₹{itemTotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography color="text.secondary">GST ({GST_PERCENTAGE}%)</Typography>
              <Typography color="text.secondary">₹{gstAmount.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" fontWeight={600}>
                Total Amount
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                ₹{totalWithGst}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* --- Buttons --- */}
      {cartItems.length > 0 && (
        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" }, mb: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleClearCart}
            size={isMobile ? "small" : "medium"}
            sx={{
              py: isMobile ? 1 : 1.5,
              borderRadius: 2,
              borderColor: "error.main",
              color: "error.main",
            }}
          >
            Clear Cart
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCheckout}
            size={isMobile ? "small" : "medium"}
            sx={{
              py: isMobile ? 1 : 1.5,
              borderRadius: 2,
              backgroundColor: "success.main",
            }}
          >
            {isMobile ? "Checkout" : "Proceed to Checkout"}
          </Button>
        </Box>
      )}

      {/* --- Spinner --- */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default CartPage;
