import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Container,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
  background: 'linear-gradient(to right, rgba(255, 255, 255, 0.6), rgba(255, 225,220, 0.1))',
  pt: 6,
  pb: 4,
  m: 2,
  borderRadius: 4,
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  overflow: 'hidden',
}}

    >
      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="space-between">
          <Grid item xs={12} md={3}>
                      {/* LOGO */}
   <Box 
      sx={{ 
        display: 'inline-block',
        position: 'relative',
        padding: '0 4px'
      }}
      component={motion.div}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
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
          position: 'relative',
          display: 'inline-block',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -4,
            left: 0,
            width: '100%',
            height: 2,
            background: 'linear-gradient(90deg, #FF512F, #DD2476)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
            transition: 'transform 0.3s ease'
          },
          '&:hover::after': {
            transform: 'scaleX(1)'
          }
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
              {['Product', 'Pricing', 'Log in', 'Request Access', 'Partnerships'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  color="text.secondary"
                  sx={{ '&:hover': { color: 'orangered' } }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              About us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['About heilsa', 'Contact us', 'Features', 'Careers'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  color="text.secondary"
                  sx={{ '&:hover': { color: 'orangered' } }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Help Center', 'Book a Demo', 'Server Status', 'Blog'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  color="text.secondary"
                  sx={{ '&:hover': { color: 'orangered' } }}
                >
                  {text}
                </Link>
              ))}
            </Box>
 
<Typography 
  component="a" 
  ariant="subtitle1" fontWeight="bold" gutterBottom
  href="http://localhost:3001"
 underline="none"
                  color="text.secondary"
                  sx={{ '&:hover': { color: 'orangered' } }}
>
  Admin
</Typography>

          </Grid>
           

          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Get in touch
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Questions or feedback? We’d love to hear from you.
            </Typography>
            <Box>
              <IconButton href="#" aria-label="Facebook" sx={{ color: '#4267B2' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="#" aria-label="Twitter" sx={{ color: '#1DA1F2' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" aria-label="LinkedIn" sx={{ color: '#0077b5' }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ mt: 4, mb: 2 }} />

      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
        ©2019 Sworkit® by Nexercise, Inc.
        <br />
        <Link href="#" underline="hover" color="text.primary">
          Terms of Service
        </Link>{' '}
        |{' '}
        <Link href="#" underline="hover" color="text.primary">
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
