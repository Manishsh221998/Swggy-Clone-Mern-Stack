import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useResetPassword } from '../../hooks/useUser';

const ResetPasswordForm = () => {
  const { id, token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useResetPassword();

  const onSubmit = (data) => {
    mutate({
      id,
      token,
      newPasswordData: {
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#fff8f2"
      px={2}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 420,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography
          variant="h5"
          mb={1}
          textAlign="center"
          sx={{ fontWeight: 700, color: '#333' }}
        >
          🔒 Reset Your Password
        </Typography>

        <Typography
          variant="body2"
          mb={3}
          textAlign="center"
          color="text.secondary"
        >
          Enter your new password to regain access.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password', {
              required: 'New password is required',
              minLength: {
                value: 4,
                message: 'Password must be at least 4 characters',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#fc8019',
              color: '#fff',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#e67009',
              },
              borderRadius: 2,
              py: 1.2,
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPasswordForm;
