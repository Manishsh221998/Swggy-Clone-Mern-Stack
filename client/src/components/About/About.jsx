import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Restaurant,
  LocalShipping,
  Payment,
  Group,
  CheckCircleOutline,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import "@fontsource/poppins"; // Poppins font imported

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const glassStyle = {
  backdropFilter: 'blur(14px)',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '20px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
};

const AboutPage = () => {
  const theme = useTheme();

  const teamMembers = [
    {
      name: 'Jenny Duct',
      role: 'CEO & Founder',
      avatar: 'J',
      image: '/Team-Member/t1.jpg',
      description: 'Leading strategy and vision at Eatzy.',
    },
    {
      name: 'Jane Smith',
      role: 'Head Cordinator',
      avatar: 'J',
      image: '/Team-Member/t2.jpg',
      description: 'Crafting delicious recipes every day.',
    },
    {
      name: 'Mikky Johnson',
      role: 'Delivery Manager',
      avatar: 'M',
      image: '/Team-Member/t3.avif',
      description: 'Ensuring fast and safe deliveries.',
    },
    {
      name: 'Nikke Amora',
      role: 'Manager in-Charge',
      avatar: 'M',
      image: '/Team-Member/t4.jpg',
      description: 'Ensuring fast and safe deliveries.',
    },
  ];

  return (
    <Box
      sx={{
        fontFamily: '"Poppins", sans-serif',
        background: "linear-gradient(to bottom right, #FFEDF3 80%, #e0f7fa 30%)",
        py: 6,
        px: 2,
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          textAlign="center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mb: 8 }}
        >
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 2 }}
          >
            About
          </Typography>
          <Typography
             sx={{ fontWeight: 700, mt: 1, fontSize: { xs: '1rem', md: '2.75rem' },
           background: "linear-gradient(to right, black,#626F47)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent", }}
          >
            EatZy - The Dream Team of Digital Food Delivery
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            maxWidth="sm"
            sx={{ mx: 'auto', mt: 2, textAlign: 'center' }}
          >
            We grow food businesses online. Period.
          </Typography>
        </MotionBox>

        <MotionPaper elevation={0} sx={{ ...glassStyle, p: 5, mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
            Our Story
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={8}>
              <Typography paragraph textAlign="center">
                Founded in 2018, Eatzy began as a small project to connect local
                restaurants with food lovers in San Francisco. What started as a
                simple idea has now grown into one of the most trusted food
                delivery platforms in the country.
              </Typography>
              <Typography paragraph textAlign="center">
                Our mission is simple: to make food delivery fast, easy, and
                delightful. We carefully select our restaurant partners to ensure
                you get the best quality meals every time.
              </Typography>
            </Grid>
          </Grid>
        </MotionPaper>

        <Grid container spacing={4} justifyContent="center" sx={{ mb: 10 }}>
          {[...Array(4)].map((_, i) => (
            <Grid item xs={12} sm={6} md={3} key={i} display="flex" justifyContent="center">
              <MotionPaper
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                elevation={0}
                sx={{
                  borderRadius: 4,
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#fff',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
                  },
                  width: '100%',
                }}
              >
                {[<Restaurant sx={{ fontSize: 40, color: '#ff7043' }} />,
                  <LocalShipping sx={{ fontSize: 40, color: '#42a5f5' }} />,
                  <Payment sx={{ fontSize: 40, color: '#66bb6a' }} />,
                  <Group sx={{ fontSize: 40, color: '#ab47bc' }} />,
                ][i]}
                <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                  {['100+ Restaurants', 'Fast Delivery', 'Secure Payments', '24/7 Support'][i]}
                </Typography>
                <Typography color="text.secondary" mt={1} fontSize={14}>
                  {[
                    'Wide selection of cuisines',
                    'Average delivery time under 30 mins',
                    'Multiple payment options',
                    'Dedicated customer service'
                  ][i]}
                </Typography>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} display="flex" justifyContent="center">
              <MotionPaper
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                elevation={0}
                sx={{
                  borderRadius: 4,
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 16,
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#ccc',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Box>
                <Avatar
                  src={member.image}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: 2,
                    objectFit: 'cover',
                  }}
                  variant="rounded"
                >
                  {member.avatar}
                </Avatar>
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 99,
                    backgroundColor: '#f1f1f1',
                    fontSize: 14,
                    fontWeight: 500,
                    mb: 1.5,
                  }}
                >
                  {member.name}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {member.description}
                </Typography>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>

        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mt: 10 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
            Our Values
          </Typography>
          <List>
            {[
              'Quality food from trusted restaurants',
              'Exceptional customer service',
              'Fast and reliable delivery',
              'Innovation in food technology',
              'Supporting local businesses',
            ].map((value, index) => (
              <ListItem
                key={index}
                sx={{
                  px: 0,
                  py: 1,
                  borderBottom: '1px dashed #ddd',
                  justifyContent: 'center',
                }}
              >
                <ListItemIcon>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CheckCircleOutline color="primary" />
                  </motion.div>
                </ListItemIcon>
                <ListItemText primary={value} />
              </ListItem>
            ))}
          </List>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default AboutPage;
