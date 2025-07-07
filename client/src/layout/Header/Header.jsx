import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider,
  MenuItem,
  Badge,
  ClickAwayListener,
} from "@mui/material";

import {
  Menu as MenuIcon,
  ShoppingCart,
  AccountCircle,
  Home as HomeIcon,
 } from "@mui/icons-material";
import RestaurantMenuIcon  from '@mui/icons-material/RestaurantMenu';
import InfoIcon from '@mui/icons-material/Info';
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { AiOutlineLogout } from "react-icons/ai";
import AuthDrawerController from "../../components/Drawer/AuthDrawerController";
import { Link, useNavigate } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUser";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../redux/cartSlice";
import { motion } from "framer-motion";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const { data, refetch } = useUserProfile();
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [formType, setFormType] = useState("login");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const hideDropdownTimeout = useRef(null);

  const dispatch = useDispatch();
  const fullItems = useSelector((state) => state.cart.fullItems);
  const totalCount = fullItems.reduce((acc, item) => acc + item.quantity, 0);

  const [scrolled, setScrolled] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const toggleLoginDrawer = (open, type = "login") => () => {
    setFormType(type);
    setLoginDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      refetch();
      dispatch(fetchCart());
    }
  }, [token, refetch, dispatch]);

  useEffect(() => {
    if (data?.data?.data) {
      setUser(data.data.data);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position={isMobile || loginDrawerOpen ? "static" : "fixed"}
        elevation={0}
        sx={{
          background
          : scrolled
            ? "linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,243,213,0.85) 100%)"
            : "transparent",
          color: "#000",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          transition: "all 0.3s ease-in-out",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          zIndex: theme.zIndex.drawer + 1,
          py: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1320px",
            px: { xs: 2, sm: 3, md: 4 },
            mx: "auto",
          }}
        >
          <Toolbar sx={{ px: 0 }}>
            {/* Left: Logo */}
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <Box
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                sx={{ padding: "0 4px" }}
              >
                <Typography
                  variant="h6"
                  component={Link}
                  to="/"
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #FF512F 0%, #DD2476 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: 3,
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 28,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    textDecoration: "none",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -6,
                      left: 0,
                      width: "100%",
                      height: 2,
                      background: "linear-gradient(90deg, #FF512F, #DD2476)",
                      transformOrigin: "left",
                      transform: "scaleX(0)",
                      transition: "transform 0.3s ease",
                    },
                    "&:hover::after": {
                      transform: "scaleX(1)",
                    },
                  }}
                >
                  EatZy
                </Typography>
              </Box>
            </Box>

            {/* Center: Menu */}
            {!isMobile && (
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center", gap: 4 }}>
                {[{ 
                  // icon: <HomeIcon sx={{fontSize:18}} />, 
                path: "/", label: "Home" },
                {
                  //  icon: <InfoIcon sx={{fontSize:18}}/>,
                 path: "/about", label: "About" },
                  { 
                    // icon: <RestaurantMenuIcon sx={{fontSize:18}}  />, 
                  path: "/menu", label: "Menu" },
                  {
                    icon: (
                      <Badge badgeContent={totalCount} color="success">
                        <ShoppingCart sx={{fontSize:18}}  />
                      </Badge>
                    ),
                    path: "/cart",
                    // label: "Cart",
                  },
                ].map((item, idx) => (
                  <Link to={item.path} key={idx} style={{ textDecoration: "none" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        
                        cursor: "pointer",
                        "&:hover": { color: "orangered" },
                      }}
                    >
                      {item.icon}
                      <Typography variant="body2" sx={{fontSize:15}}>{item.label}</Typography>
                    </Box>
                  </Link>
                ))}
              </Box>
            )}

            {/* Right: Avatar or Login */}
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              {!isMobile ? (
                token && user ? (
                  <Box
                    onMouseEnter={() => {
                      clearTimeout(hideDropdownTimeout.current);
                      setDropdownVisible(true);
                    }}
                    onMouseLeave={() => {
                      hideDropdownTimeout.current = setTimeout(() => setDropdownVisible(false), 300);
                    }}
                    sx={{ position: "relative" }}
                  >
                    <Link to="/profile">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          px: 1,
                          py: 0.5,
                          borderRadius: 2,
                          "&:hover": { backgroundColor: "#f9f9f9" },
                        }}
                      >
                        <Avatar
                          alt={user.name}
                          src={`http://localhost:3001/${user.image}`}
                          sx={{ width: 36, height: 36 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {user.name.length > 16 ? `${user.name.slice(0, 14)}...` : user.name}
                        </Typography>
                      </Box>
                    </Link>
                    {dropdownVisible && (
                      <Box
                        onMouseEnter={() => clearTimeout(hideDropdownTimeout.current)}
                        onMouseLeave={() => {
                          hideDropdownTimeout.current = setTimeout(() => setDropdownVisible(false), 300);
                        }}
                        sx={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          mt: 2,
                          width: 170,
                          backgroundColor: "#fff",
                          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                          borderRadius: 1,
                          zIndex: 1000,
                        }}
                      >
                        {[{ label: "Profile", path: "/profile" }, { label: "Cart", path: "/cart" }].map(
                          (item, idx) => (
                            <MenuItem
                              key={idx}
                              onClick={() => {
                                navigate(item.path);
                                setDropdownVisible(false);
                              }}
                              sx={{ px: 2, py: 1.1 }}
                            >
                              {item.label}
                            </MenuItem>
                          )
                        )}
                        <Divider />
                        <MenuItem
                          onClick={() => {
                            handleLogout();
                            setDropdownVisible(false);
                          }}
                          sx={{ px: 2, py: 1.5, color: "red", fontWeight: 500 }}
                        >
                          Logout
                        </MenuItem>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      cursor: "pointer",
                      "&:hover": { color: "orangered" },
                    }}
                    onClick={toggleLoginDrawer(true, "login")}
                  >
                    <AccountCircle fontSize="small" />
                    <Typography variant="body2" >Sign in</Typography>
                  </Box>
                )
              ) : (
                <IconButton onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      {!isMobile && <Box sx={{ height: "65px" }} />}

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
          <List>
            {token && user && (
              <>
                <ListItem sx={{ gap: 1 }}>
                  <Avatar
                    alt={user.name}
                    src={`http://localhost:3001/${user.image}`}
                    sx={{ width: 40, height: 40, border: "1px solid", borderColor: "divider" }}
                  />
                  <Box sx={{ mt: 0.4 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "medium", lineHeight: 1 }}>
                      {user.name}
                    </Typography>
                    <Typography
                      component={Link}
                      to="/profile"
                      sx={{
                        fontSize: "11.5px",
                        fontWeight: 500,
                        color: "text.secondary",
                        "&:hover": {
                          color: "green",
                          textDecoration: "none",
                        },
                      }}
                    >
                      View Profile
                    </Typography>
                  </Box>
                </ListItem>
                <Divider sx={{ my: 0 }} />
              </>
            )}
            <ListItem button component={Link} to="/" >
              <HomeIcon fontSize="small" sx={{fontSize:'18px'}} />
              <ListItemText primary="Home" sx={{ ml: 1 }} />
            </ListItem>
            <ListItem button component={Link} to="/menu">
              <FastfoodIcon fontSize="small" sx={{fontSize:'18px'}} />
              <ListItemText primary="Menu" sx={{ ml: 1 }} />
            </ListItem>
            <ListItem button component={Link} to="/cart">
              <Badge badgeContent={totalCount} color="success">
                <ShoppingCart fontSize="small" sx={{fontSize:'18px'}} />
              </Badge>
              <ListItemText primary="Cart" sx={{ ml: 1}} />
            </ListItem>
            {token && user ? (
              <>
                <Divider />
                <ListItem button onClick={handleLogout}>
                  <AiOutlineLogout style={{ color: "red", fontWeight: "bold", fontSize:'18px' }} />
                  <ListItemText primary="Logout" sx={{ ml: 1 }} />
                </ListItem>
              </>
            ) : (
              <ListItem button onClick={toggleLoginDrawer(true, "login")}>
                <AccountCircle fontSize="small" />
                <ListItemText primary="Login" sx={{ ml: 1 }} />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>

      {/* Auth Panel */}
      {isMobile ? (
        <AuthDrawerController
          open={loginDrawerOpen}
          onClose={toggleLoginDrawer(false)}
          formType={formType}
          setFormType={setFormType}
        />
      ) : (
        loginDrawerOpen && (
          <ClickAwayListener onClickAway={toggleLoginDrawer(false)}>
            <Box
              // sx={{
              //   position: "absolute",
              //   top: "72px",
              //   right: 32,
              //   width: 360,
              //   backgroundColor: "#fff",
              //   boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              //   borderRadius: 2,
              //   zIndex: 1300,
              //   p: 2,
              // }}
            >
              <AuthDrawerController
                open={true}
                onClose={toggleLoginDrawer(false)}
                formType={formType}
                setFormType={setFormType}
              />
            </Box>
          </ClickAwayListener>
        )
      )}
    </>
  );
};

export default Header;
