import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Stack, 
  Paper,
  InputAdornment,
  useTheme,
  Container,
  CircularProgress,
  Divider
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useUpdatePassword, useUpdateUserProfile } from '../../../hooks/useUser';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CallIcon from '@mui/icons-material/Call';
// Swiggy color palette
const swiggyOrange = '#FC8019';
const swiggyDark = '#282C3F';
const swiggyCardBg = '#FFFFFF';

const ProfileDetails = ({ userData, setUserData }) => {
  const theme = useTheme();
  const { register: registerProfile, handleSubmit: handleProfileSubmit, setValue, formState: { errors: profileErrors } } = useForm();
  const { register: registerPassword, handleSubmit: handlePasswordSubmit, reset: resetPasswordForm, formState: { errors: passwordErrors } } = useForm();

  const { mutate: updateProfile, isLoading: isProfileLoading } = useUpdateUserProfile();
  const { mutate: updatePassword, isLoading: isPasswordLoading } = useUpdatePassword();

  useEffect(() => {
    if (userData) {
      setValue('name', userData.name || '');
      setValue('email', userData.email || '');
      setValue('mobile', userData.mobile || '');
    }
  }, [userData, setValue]);

  const onProfileSubmit = (data) => {
    updateProfile(data, {
      onSuccess: () => {
        setUserData((prev) => ({ ...prev, ...data }));
      },
    });
  };

  const onPasswordSubmit = (data) => {
    updatePassword(data, {
      onSuccess: () => {
        resetPasswordForm();
      },
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 0 }}>
      {/* Profile Information Section */}
      <Typography 
        variant="h5" 
        gutterBottom 
        fontWeight={500}
        sx={{ 
          color: swiggyDark, 
          mb: 4,
          [theme.breakpoints.down('sm')]: {
            fontSize: '1.75rem'
          }
        }}
      >
        Profile Information
      </Typography>
      
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          backgroundColor: swiggyCardBg,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
          mb: 6
        }}
      >
        <Box 
          component="form" 
          onSubmit={handleProfileSubmit(onProfileSubmit)}
          sx={{ width: '100%' }}
        >
          <Stack spacing={4}>
            <TextField
              label="Full Name"
              {...registerProfile('name', { required: 'Name is required' })}
              fullWidth
              variant="outlined"
              error={!!profileErrors.name}
              helperText={profileErrors.name?.message}
              InputLabelProps={{
                sx: {
                  color: swiggyOrange,
                  '&.Mui-focused': {
                    color: '#000000',
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '12px',
                  height: '56px'
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.divider,
                  },
                  '&:hover fieldset': {
                    borderColor: swiggyOrange,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: swiggyOrange,
                    borderWidth: '2px'
                  },
                }
              }}
            />

            <TextField
              label="Email Address"
              {...registerProfile('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              fullWidth
              variant="outlined"
              error={!!profileErrors.email}
              helperText={profileErrors.email?.message}
              InputLabelProps={{
                sx: {
                  color: swiggyOrange,
                  '&.Mui-focused': {
                    color:'black',
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '12px',
                  height: '56px'
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.divider,
                  },
                  '&:hover fieldset': {
                    borderColor: swiggyOrange,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: swiggyOrange,
                    borderWidth: '2px'
                  },
                }
              }}
            />
            
        <TextField
              label=" Mobile number"
               {...registerProfile('mobile', { 
                required: 'Mobile number is required',
                 minLength: {
    value: 10,
    message: 'Mobile number must be at least 10 digits',
  },
  pattern: {
    value: /^[0-9]{10,}$/,
    message: 'Mobile number must be valid and contain only digits',
  },
              })}
              fullWidth
              variant="outlined"
              error={!!profileErrors.mobile}
              helperText={profileErrors.mobile?.message}
              InputLabelProps={{
                sx: {
                  color: swiggyOrange,
                  '&.Mui-focused': {
                    color:'black',
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CallIcon sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '12px',
                  height: '56px'
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.divider,
                  },
                  '&:hover fieldset': {
                    borderColor: swiggyOrange,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: swiggyOrange,
                    borderWidth: '2px'
                  },
                }
              }}
            />

            <Button
              variant="contained"
              type="submit"
              size="small"
              disabled={isProfileLoading}
              sx={{
                bgcolor: swiggyOrange,
                color: 'white',
                borderRadius: '12px',
                py: 1.2,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                width: { xs: '100%', sm: '200px' },
                '&:hover': {
                  bgcolor: '#E57116',
                  boxShadow: '0 4px 12px rgba(252, 128, 25, 0.3)'
                },
                '&:disabled': {
                  bgcolor: '#FFB38E',
                  color: 'white'
                }
              }}
            >
              {isProfileLoading ? (
                <>
                  <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                  Updating...
                </>
              ) : 'Save Changes'}
            </Button>
          </Stack>
        </Box>
      </Paper>

 
    
<Divider sx={{mb:4}}/>

      {/* Password Update Section - Simplified with single field */}
      <Typography 
        variant="h5" 
        gutterBottom 
        fontWeight={500}
        sx={{ 
          color: swiggyDark, 
          mb: 4,
          [theme.breakpoints.down('sm')]: {
            fontSize: '1.75rem'
          }
        }}
      >
        Change Password
      </Typography>
      
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb:1.8,
          borderRadius: 3,
          backgroundColor: swiggyCardBg,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Box 
          component="form" 
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          sx={{ width: '100%' }}
        >
          <Stack spacing={4}>
            <TextField
              label="New Password"
              type="password"
              placeholder='******'
              {...registerPassword('password', { 
                required: 'New password is required',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters'
                }
              })}
              fullWidth
              variant="outlined"
              error={!!passwordErrors.newPassword}
              helperText={passwordErrors.newPassword?.message}
              InputLabelProps={{
                sx: {
                  color: swiggyOrange,
                  '&.Mui-focused': {
                    color: '#000000',
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '12px',
                  height: '56px'
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.divider,
                  },
                  '&:hover fieldset': {
                    borderColor: swiggyOrange,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: swiggyOrange,
                    borderWidth: '2px'
                  },
                }
              }}
            />

            <Button
              variant="contained"
              type="submit"
              size="small"
              disabled={isPasswordLoading}
              sx={{
                bgcolor: swiggyOrange,
                color: 'white',
                borderRadius: '12px',
                py: 1.2,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                width: { xs: '100%', sm: '200px' },
                '&:hover': {
                  bgcolor: '#E57116',
                  boxShadow: '0 4px 12px rgba(252, 128, 25, 0.3)'
                },
                '&:disabled': {
                  bgcolor: '#FFB38E',
                  color: 'white'
                }
              }}
            >
              {isPasswordLoading ? (
                <>
                  <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                  Updating...
                </>
              ) : 'Update Password'}
            </Button>
          </Stack>
        </Box>
      </Paper>
      
    </Container>
  );
};

export default ProfileDetails;