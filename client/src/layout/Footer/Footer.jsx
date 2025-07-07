import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
   IconButton,
  Divider,
  Container,
  useTheme,
  useMediaQuery,
  ClickAwayListener,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion } from 'framer-motion';
import AuthDrawerController from '../../components/Drawer/AuthDrawerController'; // Adjust path if needed
import { Link } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [formType, setFormType] = useState("login");

  const toggleLoginDrawer = (open, type = "login") => () => {
    setFormType(type);
    setLoginDrawerOpen(open);
  };

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(to right, rgba(255, 255, 255,0.6) 50%, rgb(229, 224, 216,0.40))',
        pt: 6,
        pb: 2.5,
        px: { xs: 2, sm: 4 },
        // mx: 2,
        // mt: 4,
        // borderRadius: 4,
        boxShadow: '0 8px 16px rgba(31, 38, 135, 0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
       }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="space-between">
          <Grid item xs={12} md={3}>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              sx={{ display: 'inline-block' }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #FF512F 0%, #DD2476 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: 3,
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 28,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    width: '100%',
                    height: 2,
                    background: 'linear-gradient(90deg, #FF512F, #DD2476)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                  },
                }}
              >
                EatZy
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Products
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
              component={Link}
                to="/menu"
              
                sx={{color:'text.secondary', '&:hover': { color: 'orangered' } }}
              >
                Menu
              </Box>
              <Box
               component={Link}
                to="/"
              
                sx={{color:'text.secondary', '&:hover': { color: 'orangered' } }}
              >
                Best sellers
              </Box>
              <Link
                href="#"
                underline="none"
                color="text.secondary"
                onClick={toggleLoginDrawer(true, 'login')}
                sx={{ '&:hover': { color: 'orangered' } }}
              >
                Login
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              About Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[{name:'About us',path:'/about'},{name:'Our Team',path:'/about'}, {name:'Contact us',path:'/contact'},{name:'Terms & Conditions',path:'/t&c'},{name:'Privacy Policy',path:'/privacy-policy'}, ].map((v) => (
                <Box
                  component={Link}
                  to={v.path}
                  underline="none"
                  color="text.secondary"
                  sx={{ '&:hover': { color: 'orangered' } }}
                >
                  {v.name}
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[{name:'Help Center',path:'/contact'}, {name:'Blog',path:'/'}, {name:'Admin',path:'http://localhost:3001/'},].map((v) => (
                <Box
                  component={Link}
                  to={v.path}
                  underline="none"
                  color="text.secondary"
                  sx={{ '&:hover': { color: 'orangered' } }}
                >
                  {v.name}
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Get in touch
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Questions or feedback? We’d love to hear from you.
            </Typography>
            <Box>
              <IconButton
                href="#"
                aria-label="Facebook"
                sx={{
                  color: '#4267B2',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.2)' },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="#"
                aria-label="Twitter"
                sx={{
                  color: '#1DA1F2',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.2)' },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="#"
                aria-label="LinkedIn"
                sx={{
                  color: '#0077b5',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.2)' },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ my:2.5}} />

      <Box textAlign="center">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <Link to="/t&c" underline="hover" color="text.primary">
            Terms of Service
          </Link>{' '}
          |{' '}
          <Link to="/privacy-policy" underline="hover" color="text.primary">
            Privacy Policy
          </Link>
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontSize: 12,
            display: 'block',
            mt: 2,
          }}
        >
          © 2025 EatZy – Online Food Delivery App. All Rights Reserved. | Developed with <span style={{color:'red'}}>❤️</span> by <span style={{color:'black'}}>Manish Sharma</span>
        </Typography>
      </Box>

      {/* Auth Drawer (Login Panel) */}
      {loginDrawerOpen && (
        <ClickAwayListener onClickAway={toggleLoginDrawer(false)}>
          <Box>
            <AuthDrawerController
              open={true}
              onClose={toggleLoginDrawer(false)}
              formType={formType}
              setFormType={setFormType}
            />
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default Footer;
