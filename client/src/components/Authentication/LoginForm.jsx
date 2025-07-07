import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useUserLogin } from '../../hooks/useUser';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const LoginForm = ({ onChangeForm, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isSuccess } = useUserLogin();
  
  useEffect(() => {
    if (isSuccess) {
      onClose?.();
    }
  }, [isSuccess]);

  const onSubmit = (data) => {
    mutate(data);
  };

  // Faster animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Faster stagger
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
        damping: 20, // More springy
        stiffness: 200, // Stiffer spring
        duration: 0.3 // Faster duration
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02, 
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.15 } // Faster hover
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 } // Faster tap
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeInOut" }} // Faster transition
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
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
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
                  Welcome Back
                </Typography>
                <Typography
                  onClick={() => onChangeForm('register')}
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
                  // whileHover={{ x: 1 }} // Added slight hover movement
                >
                  <Box component="span">Don't have an account?</Box>
                  <Box component="span" color="black" fontWeight={600}>Sign up</Box>
                </Typography>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, duration: 0.2 }} // Faster hover
              >
                <Box
                  component="img"
                  src="/pizzaa.png"
                  alt="Login"
                  sx={{ 
                    width: { xs: 70, sm:110, lg: 130 },
                    height: { xs: 70, sm:110, lg: 130 },
                    filter: 'drop-shadow(0 4px 8px rgba(252, 128, 25, 0.3))'
                  }}
                />
              </motion.div>
            </Box>

            {/* Input Fields */}
            <Box sx={{ '& > div': { mb: 1.8 } }}>
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

              <motion.div variants={itemVariants}>
                <TextField
                  fullWidth
                  size="medium"
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ 
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
            </Box>

            {/* Forgot Password Link */}
            <motion.div 
              variants={itemVariants}
              // whileHover={{ x: 2 }} // Added hover animation
            >
              <Typography
                variant="body2"
                onClick={() => onChangeForm('forgotPassword')}
                sx={{ 
                  cursor: 'pointer', 
                  color: 'text.secondary', 
                  mt: 1,
                  textAlign: 'right',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'black'
                  }
                }}
              >
                Forgot Password?
              </Typography>
            </motion.div>

            {/* Submit Button - Never disabled */}
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
                      duration: 1.2, // Faster loading animation
                      repeat: Infinity 
                    }}
                  >
                    Signing In...
                  </motion.span>
                ) : (
                  'Sign in'
                )}
              </Button>
            </motion.div>

            {/* Footer */}
            <motion.div 
              variants={itemVariants}
              style={{ marginTop: 16 }}
            >
              <Typography
                variant="caption"
                sx={{
                  textAlign: 'center',
                  display: 'block',
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: 1.5
                }}
              >
                By logging in, you agree to our <Box component={Link} to='t&c' fontWeight="600" color="black">Terms</Box> and <Box component={Link} to='/privacy-policy' fontWeight="600" color="black">Privacy Policy</Box>
              </Typography>
            </motion.div>
          </motion.div>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginForm;