import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
} from '@mui/icons-material';

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #ffffff 80%, #e0f7ff 20%)',
        py: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Centered Contact Info */}
          <Grid item xs={12} md={6}>
            <Box textAlign="center" mb={6}>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
                Contact
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
                Get in touch with Eatzy
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                maxWidth="sm"
                mx="auto"
                mt={2}
              >
                We’re here to help. Reach out to us with your questions, ideas, or just to say hello.
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
              }}
            >
              <Box sx={{ '& > div': { mb: 3 } }}>
                <ContactInfoItem
                  icon={<Phone color="primary" />}
                  title="Phone"
                  content="+1 (555) 123-4567"
                />
                <ContactInfoItem
                  icon={<Email color="primary" />}
                  title="Email"
                  content="support@eatzy.com"
                />
                <ContactInfoItem
                  icon={<LocationOn color="primary" />}
                  title="Address"
                  content="123 Food Street, San Francisco, CA 94107"
                />
                <ContactInfoItem
                  icon={<Schedule color="primary" />}
                  title="Support Hours"
                  content="Mon-Fri: 9AM - 8PM | Sat-Sun: 10AM - 6PM"
                />
              </Box>
            </Paper>
          </Grid>

          {/* Right-side Image */}
          {!isMobile && (
            <Grid item md={6}>
              <Box
                sx={{
                  width: '100%',
                  height: 500,
                  backgroundImage: 'url(https://source.unsplash.com/800x800/?food,restaurant)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 4,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

// Reusable contact info display
const ContactInfoItem = ({ icon, title, content }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
    <Box sx={{ pt: 0.5 }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography>{content}</Typography>
    </Box>
  </Box>
);

export default ContactPage;
