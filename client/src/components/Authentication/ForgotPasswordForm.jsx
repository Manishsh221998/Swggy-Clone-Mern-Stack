import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useResetPasswordLink } from '../../hooks/useUser';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Animation variants matching LoginForm
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02, 
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.15 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
       >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            px: { xs: 2, sm: 4 },
            py: 3,
            position: 'relative',
            maxWidth: 410,
            width: '100%',
           }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h5" 
                  fontWeight="700" 
                  sx={{ 
                    fontFamily: 'Poppins, sans-serif',
                    background: 'linear-gradient(45deg, #fc8019, #ff4500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  Forgot Password
                </Typography>
                <Typography
                  onClick={() => onChangeForm('login')}
                  sx={{
                    mt: 0.5,
                    fontSize: '0.8rem',
                    color: 'text.secondary',
                    cursor: 'pointer',
                    fontWeight: 500,
                    display: 'flex',
                    gap: 0.5,
                    alignItems: 'center',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                  component={motion.div}
                  // whileHover={{ x: 1 }}
                >
                  <Box component="span">or</Box>
                  <Box component="span" color="black" fontWeight={600}>login to your account</Box>
                </Typography>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, duration: 0.2 }}
              >
                <Box
                  component="img"
                  src="/reset-password.png"
                  alt="Forgot Password"
                  sx={{ 
                    width: { xs: 80, sm:80, lg: 90 },
                    height: { xs: 80, sm:80, lg: 90 },
                    filter: 'drop-shadow(0 4px 8px rgba(252, 128, 25, 0.3))'
                  }}
                />
              </motion.div>
            </Box>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <TextField
                fullWidth
                size="medium"
                label="Email"
                type="email"
                variant="outlined"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ 
                  mb: 1.8,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                        borderWidth: '1px'
                      }
                    }
                  }
                }}
              />
            </motion.div>

            {/* Status Messages */}
            {isSuccess && (
              <motion.div 
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                  Reset link sent! Check your email.
                </Typography>
              </motion.div>
            )}

            {isError && (
              <motion.div 
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {error?.response?.data?.message || 'Something went wrong'}
                </Typography>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div 
              variants={itemVariants}
              style={{ marginTop: 20 }}
            >
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  height: 40,
                  borderRadius: '8px',
                  backgroundColor: '#fc8019',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  '&:hover': {
                    backgroundColor: '#fb6a02',
                  },
                }}
                component={motion.button}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isPending ? (
                  <motion.span
                    animate={{ 
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ 
                      duration: 1.2,
                      repeat: Infinity 
                    }}
                  >
                    Sending...
                  </motion.span>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </motion.div>

             
          </motion.div>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default ForgotPasswordForm;