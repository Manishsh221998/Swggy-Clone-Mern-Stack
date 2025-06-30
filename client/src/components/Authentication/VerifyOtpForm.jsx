import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useVerifyOtp } from '../../hooks/useUser';
 
const VerifyOtpForm = ({ onChangeForm, onClose }) => {
  const {
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isSuccess, isError, error } = useVerifyOtp();

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otpError, setOtpError] = useState('');

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    setValue(`otp${index + 1}`, value);
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

    // React to successful verify otp
    useEffect(() => {
    if (isSuccess) {
       reset();
      onChangeForm('login'); // open OTP form instead of verifyOtp
    }
  }, [isSuccess, reset, onChangeForm]);

  const onSubmit = () => {
    const otp = inputRefs.map((_, index) => getValues(`otp${index + 1}`)).join('');
    if (otp.length !== 4) {
      setOtpError('Please enter all 4 digits');
      return;
    }
    mutate({ otp });
    setOtpError('');
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
        mx: '0rem',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6, mt: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Verify OTP
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'orangered',
              cursor: 'pointer',
              mt: 0.5,
              gap: 0.6,
              display: 'flex',
            }}
            onClick={() => onChangeForm('login')}
          >
            <Box sx={{ color: 'black' }}>or</Box> login to your account
          </Typography>
        </Box>
        <Box
          component="img"
          src="https://cdn-icons-png.flaticon.com/512/3039/3039394.png"
          alt="Verify OTP"
          sx={{ width: 60, height: 60, borderRadius: '50%' }}
        />
      </Box>

      {/* OTP Fields */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        {[0, 1, 2, 3].map((index) => (
          <TextField
            key={index}
            inputRef={inputRefs[index]}
            variant="outlined"
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontSize: 20, padding: '10px' },
            }}
            onChange={(e) => handleChange(index, e.target.value)}
            sx={{
              width: 60,
              backgroundColor: '#fff',
              borderRadius: 1,
            }}
          />
        ))}
      </Stack>


      {/* Success/Error Messages */}
      {otpError && (
        <Typography variant="body2" color="error" sx={{ mb: 1 }}>
          {otpError}
        </Typography>
      )}

      {isSuccess && (
        <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
          OTP Verified Successfully!
        </Typography>
      )}

      {isError && (
        <Typography variant="body2" color="error" sx={{ mb: 1 }}>
          {error?.response?.data?.message || 'Invalid OTP'}
        </Typography>
      )}

      {/* Submit Button */}
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          mt: 1,
          backgroundColor: '#fc8019',
          color: '#fff',
          fontWeight: 'medium',
          '&:hover': {
            backgroundColor: '#fb6a02',
          },
        }}
        disabled={isPending}
      >
        {isPending ? 'Verifying...' : 'Verify OTP'}
      </Button>

      
      {/* OTP Expiry Text */}
      <Typography variant="body2" sx={{ color: 'gray', textAlign: 'center', mb: 2,mt:3 }}>
        OTP is valid for 5 minutes
      </Typography>
    </Box>
  );
};

export default VerifyOtpForm;
