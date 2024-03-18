import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from 'next/link';

const Header = () => {
    const toolbarSx = {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        color: 'black',
        letterSpacing: '1.25px',
        height: '60px'

    }

    const linkSx = {
        letterSpacing: '1.25px',
        flexGrow: 1
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar sx={toolbarSx}>
                    <Button sx={{ display: 'flex', flexDirection: 'column' }}>
                        <MenuBookIcon sx={{ width: '30px', height: '30px' }} />
                        <Typography variant='subtitle1' sx={{ flexGrow: 1 }}>
                            BookStore
                        </Typography>
                    </Button>
                    <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 2 }}>
                        <Link href={'/about'} style={linkSx}>
                            ABOUT
                        </Link>
                        <Link href={'/create'} style={linkSx}>
                            CREATE
                        </Link>
                        <Link href={'/show'} style={linkSx}>
                            SHOW
                        </Link>
                    </Box>
                </Toolbar>

            </AppBar>
        </Box>
    )
}

export default Header;