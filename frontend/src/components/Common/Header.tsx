import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from 'next/link';

/*
    primary:
*/
const Header = () => {
    const toolbarSx = {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        color: '#002147',
        letterSpacing: '1.25px',
        height: '60px'

    }

    const logoButtonSx = {
        display: 'flex',
        flexDirection: 'column',
        color: '#002147',
        alignItems: 'center',
        '&:hover': {
            color: '#0059E6'
        }
    }

    const linkSx = {
        letterSpacing: '1.25px',
        flexGrow: 1,
        color: '#002147',
        '&:hover': {
            color: '#0059E6'
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar sx={toolbarSx}>
                    <Link href={'/'} >
                        <Box sx={logoButtonSx}>
                            <MenuBookIcon sx={{ width: '30px', height: '30px' }} />
                            <Typography variant='subtitle1' sx={{ flexGrow: 1 }}>
                                BookStore
                            </Typography>
                        </Box>
                    </Link>
                    <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 2 }}>
                        <Link href={'/about'} >
                            <Typography sx={linkSx}>
                                ABOUT
                            </Typography>
                        </Link>
                        <Link href={'/create'}>
                            <Typography sx={linkSx}>
                                CREATE
                            </Typography>
                        </Link>
                        <Link href={'/show'}>
                            <Typography sx={linkSx}>
                                SHOW
                            </Typography>
                        </Link>
                    </Box>
                </Toolbar>

            </AppBar>
        </Box>
    )
}

export default Header;