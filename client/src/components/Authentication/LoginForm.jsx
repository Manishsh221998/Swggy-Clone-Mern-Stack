import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { useUserLogin } from '../../hooks/useUser';
 
const LoginForm = ({ onChangeForm, onClose }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const { mutate, isPending, isSuccess} = useUserLogin();
  
  useEffect(() => {
     if (isSuccess) {
        onClose?.()
     }
   }, [isSuccess]);

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
        maxWidth: 400,
        mx: '0rem',
     
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Login
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'orangered',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mt: 0.5,
            }}
            onClick={() => onChangeForm('register')}
          >
            <Box sx={{ color: 'black' }}>or</Box> create an account
          </Typography>
        </Box>
        <Box
          component="img"
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="Login Icon"
          sx={{ width: 60, height: 60, borderRadius: '50%' }}
        />
      </Box>

      {/* Email Field */}
      <TextField
        {...register('email', { required: 'Email is required' })}
        fullWidth
        placeholder="Email"
        margin="normal"
        variant="outlined"
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
      />

      {/* Password Field */}
      <TextField
        {...register('password', { required: 'Password is required' })}
        fullWidth
        placeholder="Password"
        type="password"
        margin="normal"
        variant="outlined"
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
      />

      {/* Submit Button */}
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={isPending}
        sx={{
          mt: 2,
          backgroundColor: '#fc8019',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#fb6a02',
          },
        }}
      >
        {isPending ? 'Logging in...' : 'LOGIN'}
      </Button>

      {/* Forgot Password Link */}
      <Typography
        variant="body2"
        onClick={() => onChangeForm('forgotPassword')}
        sx={{ cursor: 'pointer', color: 'GrayText', mt: 2 }}
      >
        Forgot Password?
      </Typography>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{ mt: 3, textAlign: 'center', display: 'block', color: '#555' }}
      >
        By clicking on Login, I accept the{' '}
        <strong>Terms & Conditions & Privacy Policy</strong>
      </Typography>
    </Box>
  );
};

export default LoginForm;
