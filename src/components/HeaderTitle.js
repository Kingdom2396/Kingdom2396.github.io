import React from 'react';
import { Box, Typography } from '@mui/material';
import { Castle } from '@mui/icons-material';

const HeaderTitle = () => {
  console.log("header")
    return (
        <Box sx={{ display: 'inline-flex' }}>
            <Castle sx={{ marginLeft: '20px', marginRight: '16px', marginTop: '2px' }}/>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                KINGDOM 2396
              </Typography>
        </Box>
    )
}

export default HeaderTitle;
