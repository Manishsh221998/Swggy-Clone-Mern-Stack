import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ProfileDetails from './ProfileDetails';
import AddressSection from './AddressSection';
import OrderHistory from './OrderHistory';
import ProfileHeader from './ProfileHeader';
import { useUserProfile } from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

// Swiggy color palette
const swiggyOrange = '#FC8019';
const swiggyDark = '#282C3F';
const swiggyLightBg = '#F8F8F8';
const swiggyCardBg = '#FFFFFF';

const ProfilePage = () => {
  const [selected, setSelected] = useState('Profile');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const { data, isLoading, isError, isSuccess } = useUserProfile();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isSuccess && data) {
      const user = data?.data?.data;
      setUserData({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        image: user.image || '',
      });
    }
  }, [data, isSuccess]);

  const logout = () => {
    window.localStorage.clear();
    setTimeout(() => navigate("/", { replace: true }), 1);
  };

  if (isLoading) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress sx={{ color: swiggyOrange }} />
      </Box>
    );
  }

  if (isError || !userData) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Typography color="error">Failed to load profile data.</Typography>
      </Box>
    );
  }

  const renderSection = () => {
    switch (selected) {
      case 'Profile':
        return <ProfileDetails userData={userData} setUserData={setUserData} />;
      case 'Addresses':
        return <AddressSection />;
      case 'Order History':
        return <OrderHistory />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: swiggyLightBg, minHeight: '100vh', pb: 6 }}>
      {/* Swiggy-style max width */}
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          pt: 6,
        }}
      >
        {/* Profile Header */}
        <ProfileHeader
          user={userData}
          onEdit={() => setSelected('Profile')}
          sx={{ mb: 4 }}
        />

        {/* Sticky Navigation Tabs */}
        <Paper
          elevation={0}
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'white',
            mb: 3,
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)',
          }}
        >
          <Tabs
            value={selected}
            onChange={(e, newValue) => setSelected(newValue)}
            variant={isMobile ? 'scrollable' : 'fullWidth'}
            scrollButtons={isMobile ? 'auto' : false}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              bgcolor: 'white',
              '& .MuiTabs-indicator': {
                height: 2.1,
                backgroundColor: swiggyOrange,
              },
            }}
          >
            <Tab
              value="Profile"
              label="Profile Details"
              sx={{
                py: 2,
                fontWeight: 500,
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  color: swiggyDark,
                },
              }}
            />
            <Tab
              value="Addresses"
              label="My Addresses"
              sx={{
                py: 2,
                fontWeight: 500,
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  color: swiggyDark,
                },
              }}
            />
            <Tab
              value="Order History"
              label="Order History"
              sx={{
                py: 2,
                fontWeight: 500,
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  color: swiggyDark,
                },
              }}
            />
          </Tabs>
        </Paper>

        {/* Content Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            backgroundColor: swiggyCardBg,
            width: '100%',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)',
            border: `0.5px solid ${theme.palette.divider}`,
          }}
        >
          {renderSection()}
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfilePage;
