// Updated Header component with Cart Badge Integration
import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
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
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  HelpOutline,
  ShoppingCart,
  AccountCircle,
  Home as HomeIcon,
} from "@mui/icons-material";
import { AiOutlineLogout } from "react-icons/ai";
import AuthDrawerController from "../../components/Drawer/AuthDrawerController";
import { Link, useNavigate } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUser";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../redux/cartSlice";

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

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#000", py: 1, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)", zIndex: theme.zIndex.drawer + 1 }}>
      <Box sx={{ width: "100%", maxWidth: "1320px", px: { xs: 2, sm: 3, md: 4 }, mx: "auto" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "orangered" }}>Swiggy</Typography>
            </Link>
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#f1f1f1", px: 2, borderRadius: 2, width: "35%" }}>
              <SearchIcon color="action" />
              <InputBase placeholder="Search for restaurants or dishes" sx={{ ml: 1, flex: 1 }} />
            </Box>
          )}

          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              {[{ icon: <HomeIcon />, path: '/', label: "Home" }, { icon: <HelpOutline />, label: "About" }, {
                icon: <Badge badgeContent={totalCount} color="error"><ShoppingCart /></Badge>,
                path: '/cart',
                label: "Cart"
              }].map((item, idx) => (
                <Link to={item.path} key={idx} style={{ textDecoration: "none" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", '&:hover': { color: "orangered" } }}>
                    {item.icon}
                    <Typography variant="body2">{item.label}</Typography>
                  </Box>
                </Link>
              ))}

              {/* Authenticated Dropdown */}
              {token && user ? (
                <Box onMouseEnter={() => { clearTimeout(hideDropdownTimeout.current); setDropdownVisible(true); }} onMouseLeave={() => { hideDropdownTimeout.current = setTimeout(() => setDropdownVisible(false), 300); }}>
                  <Link to="/profile">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1, py: 0.5, borderRadius: 2, '&:hover': { backgroundColor: "#f9f9f9" } }}>
                      <Avatar alt={user.name} src={`http://localhost:3001/${user.image}`} sx={{ width: 36, height: 36 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{user.name.length > 14 ? `${user.name.slice(0, 8)}` : user.name}</Typography>
                    </Box>
                  </Link>
                  {dropdownVisible && (
                    <Box onMouseEnter={() => clearTimeout(hideDropdownTimeout.current)} onMouseLeave={() => { hideDropdownTimeout.current = setTimeout(() => setDropdownVisible(false), 300); }} sx={{ position: "absolute", top: "100%", right: 0, mt: 2.5, width: 200, backgroundColor: "#fff", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", borderRadius: 1, zIndex: 1000 }}>
                      {[{ label: "Profile", path: "/profile" }, { label: "My Orders", path: "/orders" }].map((item, idx) => (
                        <MenuItem key={idx} onClick={() => { navigate(item.path); setDropdownVisible(false); }} sx={{ px: 2, py: 1.1 }}>{item.label}</MenuItem>
                      ))}
                      <Divider />
                      <MenuItem onClick={() => { handleLogout(); setDropdownVisible(false); }} sx={{ px: 2, py: 1.5, color: "red", fontWeight: 500 }}>Logout</MenuItem>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", '&:hover': { color: "orangered" } }} onClick={toggleLoginDrawer(true, "login")}>
                  <AccountCircle fontSize="small" />
                  <Typography variant="body2">Login</Typography>
                </Box>
              )}
            </Box>
          ) : (
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
          <List>
            {token && user && (
              <>
                <ListItem sx={{gap:1}}>
                  <Avatar alt={user.name} src={`http://localhost:3001/${user.image}`} sx={{ width: 40, height: 40, border: '1px solid', borderColor: 'divider' }} />
                  <Box sx={{ mt: 0.4 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'medium', lineHeight: 1 }}>{user.name}</Typography>
                    <Typography component={Link} to="/profile" sx={{ fontSize: '11.5px', fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'green', textDecoration: 'none' } }}>View Profile</Typography>
                  </Box>
                </ListItem>
                <Divider sx={{ my: 0 }} />
              </>
            )}
            <ListItem button component={Link} to="/">
              <HomeIcon fontSize="small" />
              <ListItemText primary="Home" sx={{ ml: 1 }} />
            </ListItem>
            <ListItem>
              <HelpOutline fontSize="small" />
              <ListItemText primary="About" sx={{ ml: 1 }} />
            </ListItem>
            <ListItem button component={Link} to="/cart">
              <Badge badgeContent={totalCount} color="success">
                <ShoppingCart fontSize="small" />
              </Badge>
              <ListItemText primary="Cart" sx={{ ml: 1 }} />
            </ListItem>
            {token && user ? (
              <>
                <Divider />
                <ListItem button onClick={handleLogout}>
                  <AiOutlineLogout style={{ color: "red", fontWeight: "bold" }} />
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

      <AuthDrawerController open={loginDrawerOpen} onClose={toggleLoginDrawer(false)} formType={formType} setFormType={setFormType} />
    </AppBar>
  );
};

export default Header;
