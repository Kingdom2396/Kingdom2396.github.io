import React from 'react';
import { Box, Typography } from '@mui/material';
import { Castle } from '@mui/icons-material';

const DiscordButton = () => {
    console.log("botao")
    return (
        <>
            <Typography
                variant="h6"
                component="a"
                href="http://2396.info"
                target="blank"
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                  }}>
                DISCORD
              </Typography>
        </>
    )
}

export default DiscordButton;
