import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  addToCart,
  decreaseCartItem
} from '../../../redux/cartSlice';
import {
  TextField, ToggleButton, ToggleButtonGroup, Card, Typography, Button, Grid, Chip,
  Box, Stack, IconButton, Container, Divider, Modal, Fade, Backdrop
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import RestaurentHeader from './RestaurentHeader';

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

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or price"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: <SearchIcon style={{ marginRight: 8 }} /> }}
          sx={{ marginBottom: 5 }}
        />

        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item>
            <ToggleButtonGroup value={filterType} exclusive onChange={(e, val) => val && setFilterType(val)}>
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="veg">Veg</ToggleButton>
              <ToggleButton value="non-veg">Non-Veg</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={1}>
              <Chip label="Price Low to High" variant={sortOrder === 'low' ? 'filled' : 'outlined'} onClick={() => setSortOrder('low')} />
              <Chip label="Price High to Low" variant={sortOrder === 'high' ? 'filled' : 'outlined'} onClick={() => setSortOrder('high')} />
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {filteredMenu.map((item) => (
            <Grid item xs={12} sm={12} md={6} key={item._id}>
              <Card elevation={0} sx={{ py: 3.5, boxShadow: 'none', border: 'none' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row-reverse' }, alignItems: 'flex-start' }}>
                  <Box sx={{ width: { xs: '100%', sm: 200 }, mb: { xs: 2, sm: 0 }, ml: { sm: 2 }, position: 'relative' }}>
                    <img
                      src={`http://localhost:3001/${item.image}`}
                      alt={item.name}
                      onClick={() => handleOpenModal(item)}
                      style={{ width: '100%', height: '174px', objectFit: 'cover', borderRadius: 10, cursor: 'pointer' }}
                    />

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
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {item.isVeg ? <VegIcon /> : <NonVegIcon />}
                    </Stack>

                    <Typography variant="h6" gutterBottom>{item.name}</Typography>

                    <Typography sx={{ color: 'revert', fontWeight: 600, letterSpacing: 0.6 }}>₹{item.price}</Typography>

                    <Stack direction="row" alignItems="center" spacing={1} my={0.5}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>⭐ {item.rating}</Typography>
                      <Typography variant="caption" color="textSecondary">({item.totalRatings} ratings)</Typography>
                    </Stack>

                    <Typography variant="body2" sx={{ mt: 1 }}>{item.description}</Typography>
                  </Box>
                </Box>
              </Card>
              <Divider sx={{ my: 1.2 }} />
            </Grid>
          ))}
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
                    src={`http://localhost:3001/${selectedItem.image}`}
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
