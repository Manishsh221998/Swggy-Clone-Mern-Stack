import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Stack, 
  Divider,
  IconButton,
  Chip,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Swiggy color palette
const swiggyOrange = '#FC8019';
const swiggyDark = '#282C3F';
const swiggyLightBg = '#F8F8F8';
const swiggyCardBg = '#FFFFFF';

const AddressSection = () => {
  const theme = useTheme();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Sector 12, New Delhi - 110001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      address: '456 Business Park, Connaught Place, New Delhi - 110002',
      isDefault: false
    }
  ]);

  const handleAddAddress = () => {
    // Add address logic here
    console.log('Add new address clicked');
  };

  const handleEditAddress = (id) => {
    // Edit address logic here
    console.log('Edit address:', id);
  };

  const handleDeleteAddress = (id) => {
    // Delete address logic here
    console.log('Delete address:', id);
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        fontWeight={500}
        sx={{ color: swiggyDark, mb: 3 }}
      >
        Saved Addresses
      </Typography>

      <Stack spacing={3}>
        {addresses.map((address) => (
          <Paper
            key={address.id}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: swiggyCardBg,
              border: `1px solid ${theme.palette.divider}`,
              position: 'relative',
              '&:hover': {
                boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)'
              }
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
              {address.type === 'Home' ? (
                <HomeIcon sx={{ color: swiggyOrange }} />
              ) : (
                <WorkIcon sx={{ color: theme.palette.info.main }} />
              )}
              <Typography variant="h6" fontWeight={600} sx={{ color: swiggyDark }}>
                {address.type}
              </Typography>
              {address.isDefault && (
                <Chip
                  label="Default"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(96, 178, 70, 0.1)',
                    color: '#60B246',
                    fontWeight: 600,
                    ml: 1
                  }}
                />
              )}
            </Box>

            <Typography 
              variant="body1" 
              sx={{ 
                color: swiggyDark,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2
              }}
            >
              <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              {address.address}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button
                variant="text"
                size="small"
                onClick={() => handleSetDefault(address.id)}
                disabled={address.isDefault}
                sx={{
                  color: address.isDefault ? 'text.disabled' : swiggyOrange,
                  fontWeight: 600,
                  textTransform: 'none'
                }}
              >
                {address.isDefault ? 'Default Address' : 'Set as Default'}
              </Button>

              <Box>
                <IconButton 
                  onClick={() => handleEditAddress(address.id)}
                  sx={{ color: 'text.secondary' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  onClick={() => handleDeleteAddress(address.id)}
                  sx={{ color: 'text.secondary', ml: 1 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddAddress}
          sx={{
            borderColor: swiggyOrange,
            color: swiggyOrange,
            borderRadius: '12px',
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            width: 'fit-content',
            '&:hover': {
              borderColor: swiggyOrange,
              bgcolor: 'rgba(252, 128, 25, 0.05)'
            }
          }}
        >
          Add New Address
        </Button>
      </Stack>
    </Box>
  );
};

export default AddressSection;