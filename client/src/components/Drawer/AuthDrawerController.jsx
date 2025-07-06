import React from "react";
import { Drawer, Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import LoginForm from "../Authentication/LoginForm";
import RegisterForm from "../Authentication/RegisterForm";
import ForgotPasswordForm from "../Authentication/ForgotPasswordForm";
import VerifyOtpForm from "../Authentication/VerifyOtpForm";

const AuthDrawerController = ({ open, onClose, formType, setFormType }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderForm = () => {
    switch (formType) {
      case "login":
        return <LoginForm onChangeForm={setFormType} onClose={onClose} />;
      case "register":
        return <RegisterForm onChangeForm={setFormType} onClose={onClose} />;
      case "forgotPassword":
        return <ForgotPasswordForm onChangeForm={setFormType} onClose={onClose} />;
      case "verifyOtp":
        return <VerifyOtpForm onChangeForm={setFormType} onClose={onClose} />;
      default:
        return <LoginForm onChangeForm={setFormType} onClose={onClose} />;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
 width: isMobile ? '100%' : 520,
    borderTopLeftRadius: { lg: 8 },
    borderBottomLeftRadius: { lg: 8 },
    background: 'linear-gradient(to bottom right, #ffffff, #FCF9EA )', // white to light orange
     backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding:1.5,
    color: '#333', // dark text for contrast
        },
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {renderForm()}
      </Box>
    </Drawer>
  );
};

export default AuthDrawerController;
