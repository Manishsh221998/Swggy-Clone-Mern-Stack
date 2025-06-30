import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';

const Sidebar = ({ selected, setSelected }) => {
  const tabs = ['Profile', 'Addresses', 'Order History'];

  return (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" mb={2}>Navigation</Typography>
      <Divider />
      <List>
        {tabs.map((tab, index) => (
          <ListItemButton
            key={index}
            selected={selected === tab}
            onClick={() => setSelected(tab)}
            sx={{
              borderRadius: 2,
              my: 1,
              '&.Mui-selected': {
                bgcolor: '#ffecec',
                color: '#d32f2f',
              },
            }}
          >
            <ListItemText primary={tab} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
