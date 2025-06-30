import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { useCreateUser } from '../../hooks/useUser';
import { toast } from 'react-toastify';

const RegisterForm = ({ onChangeForm, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isSuccess, data, error } = useCreateUser();

  // React to successful registration
  useEffect(() => {
  if (isSuccess) {
     reset();
    onChangeForm('verifyOtp'); // open OTP form instead of login
  }
}, [isSuccess, reset, onChangeForm]);


  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (data.profileImage?.[0]) {
      formData.append('image', data.profileImage[0]);
    }

    mutate(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        px: 4,
        py: 3,
        position: 'relative',
        maxWidth: 420,
        mx: '0rem',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            Create Account
          </Typography>
          <Typography
            variant="body2"
            onClick={() => onChangeForm('login')}
            sx={{
              mt: 1,
              color: 'orangered',
              cursor: 'pointer',
              fontWeight: 500,
              display: 'flex',
              gap: 0.5,
              alignItems: 'center',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <Box component="span" color="black">or</Box> login to your account
          </Typography>
        </Box>
        <Box
          component="img"
          src="https://cdn-icons-png.flaticon.com/512/135/135620.png"
          alt="Register"
          sx={{ width: 60, height: 60, borderRadius: '50%' }}
        />
      </Box>

      {/* Input Fields */}
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        margin="normal"
        {...register('name', { required: 'Name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        variant="outlined"
        margin="normal"
        {...register('email', { required: 'Email is required' })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 4, message: 'Min 4 characters' },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {/* File Upload */}
      <Box mt={2}>
        <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>Profile Image</Typography>
        <input type="file" {...register('profileImage')} />
      </Box>

      {/* Submit Button */}
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: '#fc8019',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: '#fb6a02'
          }
        }}
        disabled={isPending}
      >
        {isPending ? 'Registering...' : 'REGISTER'}
      </Button>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{
          mt: 3,
          textAlign: 'center',
          display: 'block',
          color: '#777',
          fontSize: '0.75rem',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        By registering, I accept the <strong>Terms & Conditions & Privacy Policy</strong>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
