import React from 'react';
import { Dialog, DialogTitle, Button, Box } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{message}</DialogTitle>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Button onClick={onConfirm} variant="contained" color="primary" sx={{ mr: 2 }}>
          Yes
        </Button>
        <Button onClick={onClose} variant="contained" color="secondary">
          No
        </Button>
      </Box>
    </Dialog>
  );
};

export default ConfirmationDialog;
