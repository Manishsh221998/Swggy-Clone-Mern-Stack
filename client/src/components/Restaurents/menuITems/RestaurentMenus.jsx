import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  addToCart,
  decreaseCartItem
} from '../../../redux/cartSlice';
import {
  TextField, Card, Typography, Button, Grid, Chip,
  Box, Stack, IconButton, Container, Divider, Modal, Fade, Backdrop
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import RestaurentHeader from './RestaurentHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseUrlImage } from '../../../api/endpoints';

const RestaurentMenus = ({ data }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = data?.data?.menuItems || [];

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAdd = (id) => {
    dispatch(addToCart({ menuItemId: id, quantity: 1 }));
  };

  const handleRemove = (id) => {
    dispatch(decreaseCartItem({ menuItemId: id }));
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const filteredMenu = menuItems
    .filter((item) => {
      const matchesType =
        filterType === 'all' ||
        (filterType === 'veg' && item.isVeg) ||
        (filterType === 'non-veg' && !item.isVeg);

      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.price.toString().includes(searchTerm);

      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'low') return a.price - b.price;
      if (sortOrder === 'high') return b.price - a.price;
      return 0;
    });

  // Animation variants
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -3,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Container style={{ padding: '20px', fontFamily: 'Arial' }} maxWidth="md">
        <Box sx={{ fontSize: '12px', color: 'grey', mb: 2 }}>
          <Link to="/">Home /</Link>{' '}
          <span style={{ color: 'black', fontWeight: 500 }}>{data?.data?.restaurant?.name}</span>
        </Box>

        <RestaurentHeader restaurant={data?.data?.restaurant} />

        <Typography
          sx={{ fontSize: '22px', my: 3.3, fontWeight: 600, color: 'GrayText', fontFamily: 'serif', letterSpacing: 2.5 }}
          align="center"
          gutterBottom
        >
          <Divider textAlign="center">MENU</Divider>
        </Typography>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name or price"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon style={{ marginRight: 8 }} /> }}
            sx={{ marginBottom: 5 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Box sx={{ display: 'flex', gap: 2, mb:3, flexWrap: 'wrap' }}>
            {/* Swiggy-style Veg/Non-Veg filter buttons */}
            <Button
              variant={filterType === 'all' ? 'contained' : 'outlined'}
              onClick={() => setFilterType('all')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 600,
                 px: 2,
                color: filterType === 'all' ? '#fff' : 'inherit',
                backgroundColor: filterType === 'all' ? '#fc8019' : 'transparent',
                borderColor: '#e0e0e0',
                '&:hover': {
                  backgroundColor: filterType === 'all' ? '#e67317' : 'rgba(252, 128, 25, 0.08)',
                  borderColor: '#fc8019'
                }
              }}
            >
              All Items
            </Button>
            
           <Button
  variant="outlined" // Always outlined
  onClick={() => setFilterType('veg')}
  sx={{
    borderRadius: '20px',
    textTransform: 'none',
    fontWeight: 600,
    px: 2,
    color: filterType === 'veg' ? '#2e7d32' : '#6b6b6b', // Professional green when selected, gray when not
    backgroundColor: 'transparent', // Always transparent
    borderColor: filterType === 'veg' ? '#2e7d32' : '#e0e0e0', // Green border when selected, light gray when not
    '&:hover': {
      backgroundColor: 'rgba(46, 125, 50, 0.04)', // Very subtle green tint on hover
      borderColor: '#2e7d32' // Full green on hover
    },
    transition: 'all 0.3s ease',
    borderWidth: '1.5px'
  }}
  startIcon={<VegIcon />}
>
  Veg
</Button>

<Button
  variant="outlined" // Always outlined
  onClick={() => setFilterType('non-veg')}
  sx={{
    borderRadius: '20px',
    textTransform: 'none',
    fontWeight: 600,
    px: 2,
    color: filterType === 'non-veg' ? '#c62828' : '#6b6b6b', // Professional red when selected, gray when not
    backgroundColor: 'transparent', // Always transparent
    borderColor: filterType === 'non-veg' ? '#c62828' : '#e0e0e0', // Red border when selected, light gray when not
    '&:hover': {
      backgroundColor: 'rgba(198, 40, 40, 0.04)', // Very subtle red tint on hover
      borderColor: '#c62828' // Full red on hover
    },
    transition: 'all 0.3s ease',
    borderWidth: '1.5px'
  }}
  startIcon={<NonVegIcon />}
>
  Non-Veg
</Button>

            <Box sx={{ flexGrow: 1 }} />
            
            <Stack direction="row" spacing={1}>
              <Chip 
                label="Price: Low to High" 
                variant={sortOrder === 'low' ? 'filled' : 'outlined'} 
                onClick={() => setSortOrder(sortOrder === 'low' ? 'none' : 'low')}
                sx={{
                  borderRadius: '16px',
                  backgroundColor: sortOrder === 'low' ? '#fc8019' : 'transparent',
                  color: sortOrder === 'low' ? '#fff' : 'inherit'
                }}
              />
              <Chip 
                label="Price: High to Low" 
                variant={sortOrder === 'high' ? 'filled' : 'outlined'} 
                onClick={() => setSortOrder(sortOrder === 'high' ? 'none' : 'high')}
                sx={{
                  borderRadius: '16px',
                  backgroundColor: sortOrder === 'high' ? '#fc8019' : 'transparent',
                  color: sortOrder === 'high' ? '#fff' : 'inherit'
                }}
              />
            </Stack>
          </Box>
        </motion.div>

        <Grid 
          container 
          spacing={3}
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <AnimatePresence>
            {filteredMenu.map((item) => (
              <Grid 
                item 
                xs={12} 
                sm={12} 
                md={6} 
                key={item._id}
                component={motion.div}
                layout
                variants={menuItemVariants}
                // whileHover="hover"
              >
                <Card 
                  elevation={0} 
                  sx={{ 
                    py: 3.5, 
                    boxShadow: 'none', 
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row-reverse' }, alignItems: 'flex-start' }}>
                    {/* Image without animation */}
                    <Box sx={{ width: { xs: '100%', sm: 200 }, mb: { xs: 2, sm: 0 }, ml: { sm: 2 }, position: 'relative' }}>
                      <img
                        src={`${BaseUrlImage}/${item?.image}`}
                        alt={item.name}
                        onClick={() => handleOpenModal(item)}
                        style={{ width: '100%', height: '174px', objectFit: 'cover', borderRadius: 10, cursor: 'pointer' }}
                      />

                      {/* Quantity controls without animation */}
                      {cart[item._id] ? (
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          justifyContent="center"
                          boxShadow={3}
                          sx={{
                            position: 'absolute',
                            bottom: -18,
                            px: 3,
                            py: 0.4,
                            left: '50%',
                            fontWeight: 700,
                            borderRadius: 3,
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                            backgroundColor: 'white',
                            color: 'green',
                            fontSize: '15px'
                          }}
                        >
                          <IconButton size="small" onClick={() => handleRemove(item._id)}>
                            <RemoveIcon sx={{ color: 'green' }} />
                          </IconButton>
                          <Typography>{cart[item._id]}</Typography>
                          <IconButton size="small" onClick={() => handleAdd(item._id)}>
                            <AddIcon sx={{ color: 'green' }} />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            position: 'absolute',
                            bottom: -18,
                            px: 7,
                            py: 1,
                            left: '50%',
                            borderRadius: 3,
                            fontWeight: 700,
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                            backgroundColor: 'white',
                            color: 'green',
                            fontSize: '14px'
                          }}
                          onClick={() => handleAdd(item._id)}
                        >
                          ADD
                        </Button>
                      )}
                    </Box>

                    <Box flex={1}>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{mb:1.5}}>
                        {item.isVeg ? <VegIcon /> : <NonVegIcon />}
                      </Stack>

                      <Typography variant="h6" gutterBottom>{item.name}</Typography>

                      <Typography sx={{ color: 'revert', fontWeight: 600, letterSpacing: 0.6 }}>₹{item.price}</Typography>

                      {/* Rating without animation */}
                      <Stack direction="row" alignItems="center" spacing={1} my={0.5}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>⭐ {item.rating}</Typography>
                        <Typography variant="caption" color="textSecondary">({item.totalRatings} ratings)</Typography>
                      </Stack>

                      <Typography variant="body2" sx={{ mt: 1,color:'GrayText' }}>{item.description}</Typography>
                    </Box>
                  </Box>
                </Card>
                <Divider sx={{ my: 1.2 }} />
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 550 },
              bgcolor: 'background.paper',
              borderRadius: 6,
              boxShadow: 24,
              p: 0,
              outline: 'none',
            }}
          >
            <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'transparent' }}>
              <CloseIcon />
            </IconButton>

            {selectedItem && (
              <>
                <Box sx={{ width: '100%', height: { xs: 200, sm: 250, md: 380 }, mb: 1, borderTopRightRadius: 23, borderTopLeftRadius: 23, overflow: 'hidden' }}>
                  <img
                    src={`${BaseUrlImage}/${selectedItem.image}`}
                    alt={selectedItem.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>

                <Box sx={{ p: 3, mb: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {selectedItem.isVeg ? <VegIcon /> : <NonVegIcon />}
                    <Typography variant="h6" fontWeight={600}>{selectedItem.name}</Typography>
                  </Stack>

                  <Typography color="textSecondary" mt={1}>₹{selectedItem.price}</Typography>

                  <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                    <Typography variant="body2" fontWeight={500}>⭐ {selectedItem.rating}</Typography>
                    <Typography variant="caption" color="textSecondary">({selectedItem.totalRatings} ratings)</Typography>
                  </Stack>

                  <Typography variant="body2" mt={2}>{selectedItem.description}</Typography>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

// Your original Veg/Non-Veg icons
const VegIcon = () => (
  <Box component="span" sx={{
    display: 'inline-block', width: 16, height: 16,
    border: '2px solid green', borderRadius: '2px', position: 'relative', mr: 1,
    '&::after': {
      content: '""', position: 'absolute', top: '50%', left: '50%',
      width: 6, height: 6, backgroundColor: 'green',
      borderRadius: '50%', transform: 'translate(-50%, -50%)'
    }
  }} />
);

const NonVegIcon = () => (
  <Box component="span" sx={{
    display: 'inline-block', width: 16, height: 16,
    border: '2px solid red', borderRadius: '2px', position: 'relative', mr: 1,
    '&::after': {
      content: '""', position: 'absolute', top: '50%', left: '50%',
      width: 6, height: 6, backgroundColor: 'red',
      borderRadius: '50%', transform: 'translate(-50%, -50%)'
    }
  }} />
);

export default RestaurentMenus;