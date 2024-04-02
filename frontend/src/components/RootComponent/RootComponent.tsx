"use client"
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const RootComponent = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography sx={{ textAlign: 'center', margin: 'auto' }} variant={'h3'}>WELCOME!</Typography>
            <Box sx={{
                display: 'flex',
                columnGap: '20px'
            }}>
                <Link href={'/login'}>LOGIN</Link>
                <Typography sx={{ lineHeight: 1.25 }}>/</Typography>
                <Link href={'/signup'} >REGISTER</Link>
            </Box>
        </Box>
    )
}

export default RootComponent