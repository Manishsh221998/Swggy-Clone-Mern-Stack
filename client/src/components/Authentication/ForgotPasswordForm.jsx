import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Typography,
  Button,
 } from '@mui/material';
 import { useResetPasswordLink } from '../../hooks/useUser';

const ForgotPasswordForm = ({ onChangeForm, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isSuccess, isError, error } = useResetPasswordLink();

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        px: 4,
        py: 3,
        position: 'relative',
        maxWidth: 400,
        mx: '0rem'
      }}
    >
    

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">Forgot Password</Typography>
          <Typography
            variant="body2"
            sx={{ color:'orangered', cursor: 'pointer', mt: 0.5 , gap:0.6,display:'flex'}}
            onClick={() => onChangeForm('login')}
          >
           <Box sx={{color:'black'}}>or</Box>login to your account
          </Typography>
        </Box>
        <Box
          component="img"
          src="https://cdn-icons-png.flaticon.com/512/2919/2919592.png"
          alt="Forgot"
          sx={{ width: 60, height: 60, borderRadius: '50%' }}
        />
      </Box>

      <TextField
        fullWidth
        placeholder="Enter your email"
        type="email"
        margin="normal"
        {...register('email', { required: 'Email is required' })}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
      />

      {isSuccess && (
        <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
          Reset link sent! Check your email.
        </Typography>
      )}

      {isError && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error?.response?.data?.message || 'Something went wrong'}
        </Typography>
      )}

      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: '#fc8019',
          color: '#fff',
          fontWeight:'medium',
          '&:hover': {
            backgroundColor: '#fb6a02'
          }
        }}
        disabled={isPending}
      >
        {isPending ? 'Sending...' : 'Send Reset Link'}
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
