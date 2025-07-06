import React from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

 const banners = [
  {
    image: "/Banner/swiggyBanner1.avif",
    // title: 'Delicious Burgers Delivered Fast',
  },
  {
    image: '/Banner/swiggyBanner2.jpg',
    // title: 'Hot Pizza Straight from the Oven',
  },
  {
    image: '/Banner/swiggyBanner3.jpg',
    // title: 'Taste Authentic Indian Cuisine',
  },
  {
    image: '/Banner/swiggyBanner4.jpg',
    // title: 'Taste Authentic Indian Cuisine',
  },
];

export default function SwiggyLandingPage() {
  return (
 
    <Box sx={{ position: 'relative', width: '100%', height: { xs: '50vh', md: '80vh',lg:'40vh' },mt:3 }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        style={{ width: '100%', height: '100%',borderRadius:28}}
      >
        {banners.map((item, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  // background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
                  zIndex: 1,
                }}
              />
              {/* Title Text */}
              <Typography
                variant="h3"
                sx={{
                  zIndex: 2,
                  color: 'white',
                  px: 3,
                   textAlign:'center',
                  maxWidth: '80%',
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Arrows */}
      <IconButton
        className="custom-prev"
        sx={{
          position: 'absolute',
          top: '50%',
          left: 10,
          zIndex: 5,
          color: 'white',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0,0,0,0.4)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        className="custom-next"
        sx={{
          position: 'absolute',
          top: '50%',
          right: 10,
          zIndex: 5,
          color: 'white',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0,0,0,0.4)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
    
  );
}
