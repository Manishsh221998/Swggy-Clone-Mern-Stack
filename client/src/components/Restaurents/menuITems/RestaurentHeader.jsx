import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const RestaurentHeader = ({ restaurant }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <Box
  sx={{
    width: '100%',
    maxWidth: '1220px',
    margin: '24px auto',
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    padding: isMobile ? '16px' : '32px',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
    backgroundImage: 'linear-gradient(125deg, #ffffff, #ffffff)',
    fontFamily: '"Basis Grotesque Pro", sans-serif'
  }}
>

      {!restaurant ? (
        <Typography variant="h6" textAlign="center">
          Loading...
        </Typography>
      ) : (
        <>
          {/* Restaurant Name */}
          <Typography
            sx={{
              fontSize: isMobile ? '24px' : '30px',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.3,
              mb:3
            }}
          >
            {restaurant?.name}
          </Typography>
 
          {/* Cuisine Names */}
          <Typography
            sx={{
              color: '#686B78',
              fontSize: '14px',
              mb: 1
            }}
          >
            {restaurant?.cuisineNames?.join(', ')}
          </Typography>

          {/* Tags */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {restaurant?.tags?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{
                  fontSize: '13px',
                  color: '#3E4152',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '6px'
                }}
              />
            ))}
          </Box>

          {/* Rating / Delivery / Price Info */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mb: 2
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#256C3D',
                color: '#fff',
                px: 1.2,
                py: 0.5,
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              <StarIcon sx={{ fontSize: '18px', mr: 0.5 }} />
              {restaurant?.rating?.toFixed(1) || '0.0'}
              {restaurant?.totalRatings > 0 && (
                <Typography
                  component="span"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                    ml: 0.5,
                    color: '#ffffffcc'
                  }}
                >
                  ({restaurant?.totalRatings})
                </Typography>
              )}
            </Box>

            <Divider orientation="vertical" flexItem sx={{ height: 20, borderColor: '#E0E0E0' }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon sx={{ fontSize: 18, color: '#FF7E8B' }} />
              <Typography sx={{ fontSize: '14px' }}>
                {restaurant?.deliveryTime} mins (Delivery Time)
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ height: 20, borderColor: '#E0E0E0' }} />

            <Typography sx={{ fontSize: '14px', color: '#3E4152' }}>
              ₹600 for two
            </Typography>
          </Box>

          {/* Address */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              backgroundColor: '#F9FAFB',
              borderRadius: '8px',
              px: 2,
              py: 1.2,
              mb: 2
            }}
          >
            <LocationOnIcon sx={{ fontSize: '20px', color: '#FF7E8B' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#02060C' }}>
                Outlet
              </Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#686B78' }}>
                {restaurant?.address?.city}, {restaurant?.address?.state}
              </Typography>
            </Box>
            <Button
              size="small"
              sx={{
                minWidth: '24px',
                padding: 0,
                color: '#1A1A1A',
                ml: 'auto',
                fontSize: '18px',
                lineHeight: 1,
                color:'red'
              }}
            >
              ▾
            </Button>
          </Box>

          {/* Bottom Divider */}
          {!isMobile && (
            <Divider sx={{ my: 3, borderColor: '#E0E0E0' }} />
          )}
        </>
      )}
    </Box>
    
  );
}

export default RestaurentHeader;
