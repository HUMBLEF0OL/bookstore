"use client"
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from 'next/link';
import { hasCookie } from 'cookies-next';

/*
    primary:
*/
const Header = () => {
    const [authToken, setAuthToken] = useState(hasCookie('authToken'));

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
        position: 'relative',
        letterSpacing: 1.25,
        flexGrow: 1,
        color: '#002147',
        '&:hover': {
            color: '#0059E6',

        },
        '&::before': {
            content: '""',
            position: 'absolute',
            height: '2px',
            width: '0',
            bottom: 0,
            left: 0,
            transition: 'width 0.3s ease-in-out',
        },
        '&:hover::before': {
            width: '100%',
            backgroundColor: '#002147',

        }
    }

    return (
        <Box sx={{ flexGrow: 1, zIndex: 1 }}>
            <AppBar position='sticky'>
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
                            <Typography sx={linkSx} component={'div'}>
                                ABOUT
                            </Typography>
                        </Link>
                        <Link href={'/books'}>
                            <Typography sx={linkSx}>
                                BOOKS
                            </Typography>
                        </Link>
                        {/* <Link href={'/create'}>
                            <Typography sx={linkSx}>
                                ADD BOOKS
                            </Typography>
                        </Link>
                        <Link href={'/update'}>
                            <Typography sx={linkSx}>
                                UPDATE BOOK
                            </Typography>
                        </Link> */}

                    </Box>
                </Toolbar>

            </AppBar>
        </Box>
    )
}

export default Header;