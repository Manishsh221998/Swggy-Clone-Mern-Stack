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

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

// Glassmorphic & modern soft card style
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
        background: '#f7f8fc',
        py: 10,
        px: 2,
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
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
          <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
            The dream team of digital food delivery
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            maxWidth="sm"
            mx="auto"
            mt={2}
          >
            We grow food businesses online. Period.
          </Typography>
        </MotionBox>

        {/* Our Story */}
        <Paper elevation={0} sx={{ ...glassStyle, p: 5, mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
            Our Story
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography paragraph>
                Founded in 2018, Eatzy began as a small project to connect local
                restaurants with food lovers in San Francisco. What started as a
                simple idea has now grown into one of the most trusted food
                delivery platforms in the country.
              </Typography>
              <Typography paragraph>
                Our mission is simple: to make food delivery fast, easy, and
                delightful. We carefully select our restaurant partners to ensure
                you get the best quality meals every time.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <Box
                component="img"
                src="/Team-Member/team.jpg"
                alt="Eatzy team"
                sx={{
                  width: '100%',
                  borderRadius: 3,
                  boxShadow: 6,
                  transition: '0.3s',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
              /> */}
            </Grid>
          </Grid>
        </Paper>

        {/* Why Choose Eatzy */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{ mb: 10 }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontWeight: 600, mb: 4 }}
          >
            Why Choose Eatzy?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <Restaurant sx={{ fontSize: 40, color: '#ff7043' }} />,
                title: '100+ Restaurants',
                text: 'Wide selection of cuisines',
              },
              {
                icon: <LocalShipping sx={{ fontSize: 40, color: '#42a5f5' }} />,
                title: 'Fast Delivery',
                text: 'Average delivery time under 30 mins',
              },
              {
                icon: <Payment sx={{ fontSize: 40, color: '#66bb6a' }} />,
                title: 'Secure Payments',
                text: 'Multiple payment options',
              },
              {
                icon: <Group sx={{ fontSize: 40, color: '#ab47bc' }} />,
                title: '24/7 Support',
                text: 'Dedicated customer service',
              },
            ].map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    p: 3,
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  {item.icon}
                  <Typography variant="h6" sx={{ mt: 1, fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary" mt={1}>
                    {item.text}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </MotionBox>

        {/* Meet Our Team (Clean card UI like reference image) */}
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                }}
              >
                {/* Number */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 16,
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#9e9e9e',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Box>

                {/* Avatar/Image */}
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

                {/* Name Badge */}
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 99,
                    backgroundColor: '#e0e0e0',
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
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Our Values */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mt: 10 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
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
