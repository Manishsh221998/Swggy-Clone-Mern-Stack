import { useEffect } from "react";
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
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
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

const GST_PERCENTAGE = 5;

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.fullItems);
  const cartQuantityMap = useSelector((state) => state.cart.items);
  const restaurantData = useSelector((state) => state.cart.restaurantData);

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
  const totalWithGst = itemTotal + gstAmount;

  const handleCheckout = () => {
    dispatch(placeOrder());
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* Restaurant Header */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
            <CardMedia
              component="img"
              image={`http://localhost:3001/${restaurantData?.image?.replace(/\\/g, "/")}`}
              alt={restaurantData?.name}
              sx={{ width: 150, height: 150, borderRadius: 2 }}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold" color="#282c3f" >
                {restaurantData?.name}
              </Typography>
              <Typography variant="body2" color="#7e808c">
                {restaurantData?.address?.city}, {restaurantData?.address?.state}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Cart Items */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <CardContent>
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <img
                src="/assets/empty_cart.svg"
                alt="Empty Cart"
                style={{ width: "120px", marginBottom: "16px" }}
              />
              <Typography variant="h6" color="#7e808c">
                Your cart is empty. Add something tasty!
              </Typography>
            </Box>
          ) : (
            cartItems.map((item) => (
              <Box key={item.menuItemId}>
                <Grid container spacing={2} alignItems="center" sx={{ py: 2 }}>
                  <Grid item xs={2} sm={1}>
                    <Avatar
                      variant="rounded"
                      src={`http://localhost:3001/${item.image.replace(/\\/g, "/")}`}
                      alt={item.name}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Grid>

                  <Grid item xs={1}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        border: `2px solid ${item.isVeg ? "#0f8a65" : "#e23744"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          backgroundColor: item.isVeg ? "#0f8a65" : "#e23744",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <Typography variant="body1" fontWeight="500" color="#282c3f">
                      {item.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                        sx={{
                          border: "1px solid #d4d5d9",
                          borderRadius: 1,
                          width: 32,
                          height: 32,
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body1"
                        fontWeight="500"
                        color="#60b246"
                        sx={{ minWidth: 20, textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                        sx={{
                          border: "1px solid #d4d5d9",
                          borderRadius: 1,
                          width: 32,
                          height: 32,
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>

                  <Grid item xs={6} sm={1}>
                    <Typography variant="body1" fontWeight="500" color="#282c3f">
                      ₹{item.price }
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={1}>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item._id, 0)}
                      sx={{ color: "#e23744" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>

                {cartItems.indexOf(item) < cartItems.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))
          )}
        </CardContent>
      </Card>

      {/* Bill and Actions */}
      {cartItems.length > 0 && (
        <>
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="#282c3f" sx={{ mb: 2 }}>
                Bill Details
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="#7e808c">Item Total</Typography>
                <Typography color="#282c3f">₹{itemTotal.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography color="#7e808c">GST ({GST_PERCENTAGE}%)</Typography>
                <Typography color="#282c3f">₹{gstAmount.toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="h5" fontWeight="bold" color="#282c3f">
                  TO PAY
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="#282c3f">
                  ₹{totalWithGst.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleClearCart}
              sx={{
                py: 1.5,
                borderColor: "#e23744",
                color: "#e23744",
                "&:hover": {
                  borderColor: "#e23744",
                  backgroundColor: "rgba(226, 55, 68, 0.04)",
                },
              }}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleCheckout}
              sx={{
                py: 1.5,
                fontWeight:600,
                color:'white',
                backgroundColor: "#60b246",
                "&:hover": {
                  backgroundColor: "#4a9c35",
                },
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;
