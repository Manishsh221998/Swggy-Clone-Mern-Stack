import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Paper,
  CircularProgress,
  Divider,
  useTheme,
} from '@mui/material';
import { useUserOrders } from '../../../hooks/useUser';
import dayjs from 'dayjs';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Swiggy color palette
const swiggyOrange = '#FC8019';
const swiggyDark = '#282C3F';
const swiggyLightBg = '#F8F8F8';
const swiggyCardBg = '#FFFFFF';
const swiggySuccess = '#60B246';

const OrderHistory = () => {
  const { data, isFetching, isSuccess } = useUserOrders();
  const theme = useTheme();
  const orders = data?.data?.data || [];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'pending':
        return 'warning';
      case 'preparing':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusStyle = (status) => {
    const baseStyle = {
      fontWeight: 600,
      textTransform: 'capitalize',
      borderRadius: '12px',
      borderWidth: '1px',
    };

    switch (status.toLowerCase()) {
      case 'delivered':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(96, 178, 70, 0.1)',
          borderColor: swiggySuccess,
          color: swiggySuccess,
        };
      case 'cancelled':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(255, 51, 51, 0.1)',
          borderColor: theme.palette.error.main,
          color: theme.palette.error.main,
        };
      case 'pending':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(255, 153, 0, 0.1)',
          borderColor: theme.palette.warning.main,
          color: theme.palette.warning.main,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          borderColor: theme.palette.info.main,
          color: theme.palette.info.main,
        };
    }
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress sx={{ color: swiggyOrange }} />
      </Box>
    );
  }

  if (isSuccess && orders.length === 0) {
    return (
      <Box textAlign="center" py={6}>
        <RestaurantIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No orders placed yet
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your delicious orders will appear here
        </Typography>
      </Box>
    );
  }

  return (
    <Box width="100%">
      <Typography 
        variant="h5" 
        gutterBottom 
        fontWeight={500}
        sx={{ color: swiggyDark, mb:3 }}
      >
        Order History
      </Typography>

      <Stack spacing={3} width="100%">
        {orders.map((order) => (
          <Box>
          <Paper
            key={order._id}
            elevation={0}
            sx={{
              width: '100%',
              p: 3,
              borderRadius: 2,
              bgcolor: swiggyCardBg,
              border: `0.5px solid ${theme.palette.divider}`,
              transition: '0.3s',
              // '&:hover': {
              //   boxShadow: '0 1px 12px 0 rgba(0,0,0,0.08)',
              // },
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Typography 
                fontWeight={700} 
                variant="body1" 
                sx={{ color: swiggyDark }}
              >
                Order ID <span style={{color:'#FF204E'}}>#{order._id.slice(-6).toUpperCase()}</span>
              </Typography>
              <Chip
                label={order.status}
                sx={getStatusStyle(order.status)}
              />
            </Box>
<Divider sx={{mb:4,mt:2,borderBottom: '1px dashed #C9B194',
}} />
            <Typography
              variant="body2"
              color="text.secondary"
              display="flex"
              alignItems="center"
              gap={1}
              mb={2}
            >
              <ScheduleIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              {dayjs(order.createdAt).format('DD MMM YYYY, h:mm A')}
            </Typography>

            <Divider sx={{ 
              borderColor: theme.palette.divider,
              mb: 2,
              borderBottomWidth: '1px'
            }} />

            <Stack spacing={1.5} width="100%" mb={2}>
              {order.items.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <FastfoodIcon fontSize="small" sx={{ color: swiggyOrange }} />
                    <Typography variant="body1" sx={{ color: swiggyDark }}>
                      {item.name} × {item.quantity}
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight={600} sx={{ color: swiggyDark }}>
                    ₹{item.price}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ 
              borderColor: theme.palette.divider,
              my: 2,
              borderBottomWidth: '1px'
            }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="body1"
                fontWeight={700}
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ color: swiggyDark }}
              >
                <CurrencyRupeeIcon fontSize="small" />
                Total Amount
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight={700} 
                sx={{ color:'teal' }}
              >
                ₹{order.totalAmount}
              </Typography>
            </Box>
          </Paper>
         </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default OrderHistory;