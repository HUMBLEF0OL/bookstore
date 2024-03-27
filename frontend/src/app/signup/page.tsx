"use client"
import { Label } from '@mui/icons-material'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const containerSx = {
        mt: '24px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        width: '450px',
        height: 'fit-content',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '10px',
        border: '2px solid white',
        borderRadius: '4px',
        backgroundColor: '#F5F5F5'
    }

    const labelSx = {
        color: '#162F3B',
        fontWeight: 600,
        fontSize: '14px',
        width: '100px'
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event?.preventDefault();
        const result = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })
        console.log(result);
    }
    return (
        <Box sx={containerSx}>
            <Typography sx={{ color: '#162F3B', fontSize: '20px', letterSpacing: 1.25 }}>
                SIGN UP
            </Typography>
            <Box sx={{ display: 'flex', columnGap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={labelSx}>EMAIL*</Typography>

                <TextField value={email} onChange={event => { setEmail(event.target.value) }} sx={{
                    '& .MuiInputBase-root': {
                        height: '40px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    },
                    '& .MuiInputBase-input': {
                        height: 'fit-content',
                        '&:focus-visible': {
                            height: '0px'
                        }
                    },
                    width: '300px'
                }} />
            </Box>

            <Box sx={{ display: 'flex', columnGap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={labelSx}>PASSWORD*</Typography>
                <TextField value={password} onChange={event => { setPassword(event.target.value) }} type='password' sx={{
                    '& .MuiInputBase-root': {
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        height: '40px'
                    },
                    width: '300px'

                }} />
            </Box>

            <Button onClick={handleSubmit} type='submit'>Submit</Button>
        </Box>
    )
}

export default page