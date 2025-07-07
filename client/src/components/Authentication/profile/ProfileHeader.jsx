import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useUpdateUserProfile } from '../../../hooks/useUser';
import { useForm } from 'react-hook-form';
import { BaseUrlImage } from '../../../api/endpoints';

// Swiggy color palette
const swiggyOrange = '#FC8019';
const swiggyDark = '#282C3F';
const swiggyLightBg = '#FFF8F1';

const ProfileHeader = ({ user, onEdit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fileInputRef = useRef(null);
  const { mutate: updateProfile, isLoading } = useUpdateUserProfile();

  const [previewImage, setPreviewImage] = useState('');

  const {
    register,
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    if (user) {
      const imageUrl = user?.image
        ? `${BaseUrlImage}/${user.image.replace(/\\/g, '/')}`
        : '';

      setValue('name', user.name || '');
      setValue('email', user.email || '');
      setValue('image', imageUrl);
      setPreviewImage(imageUrl);
    }
  }, [user, setValue]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    const formData = new FormData();
    formData.append('image', file);

    updateProfile(formData);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={{ xs: 3, sm: 3, md: 4 }}
      mb={3}
      sx={{
        backgroundColor: swiggyLightBg,
        borderRadius: 3,
        boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Left side - Avatar and Name */}
      <Box display="flex" alignItems="center" gap={2} flex={1} minWidth={0}>
        {/* Avatar with edit option */}
        <Box
          sx={{
            position: 'relative',

            width: { xs: 56, sm: 72, md: 84 },
            height: { xs: 56, sm: 72, md: 84 },
            cursor: 'pointer',
            '&:hover .editOverlay': {
              opacity: 1,
            },
            flexShrink: 0,
          }}
          onClick={handleAvatarClick}
        >
          <Avatar
            src={previewImage}
            sx={{ 
              width: '100%', 
              height: '100%',
                           border:'1.2px solid grey',
               bgcolor: swiggyOrange,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              fontWeight: 600
            }}
          >
            {!previewImage && watch('name')?.[0]?.toUpperCase()}
          </Avatar>

          {/* Edit overlay */}
          <Box
            className="editOverlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            <EditIcon sx={{ color: 'white', fontSize: '1.25rem' }} />
          </Box>
        </Box>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />

        {/* User info */}
        <Box minWidth={0}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: swiggyDark,
              fontSize: { xs: '0.9375rem', sm: '1.125rem', md: '1.25rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {watch('name')}
          </Typography>
           <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {watch('email')}
          </Typography>
        </Box>
      </Box>

      {/* Edit profile button - stays in the same row */}
      <IconButton
        onClick={onEdit}
        disabled={isLoading}
        sx={{
          ml: 1,
          color: swiggyOrange,
          '&:hover': {
            backgroundColor: '#FFF0E6',
          },
          '&:disabled': {
            color: '#FFB38E',
          },
          flexShrink: 0,
        }}
        size={isMobile ? 'small' : 'medium'}
      >
        <EditIcon fontSize={isMobile ? 'small' : 'medium'} />
      </IconButton>
    </Box>
  );
};

export default ProfileHeader;