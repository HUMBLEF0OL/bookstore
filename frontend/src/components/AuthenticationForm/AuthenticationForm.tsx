"use client"
import { makeCall } from '@/services/api.service';
import { Box, Button, TextField, Typography } from '@mui/material'
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const AuthenticationForm = ({ mode = 'login' }: { mode: 'login' | 'signup' }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState<{ email: string, password: string }>({ email: '', password: '' })
    const router = useRouter();

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

    const validateEmail = () => {
        let errorMessage = '';
        const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (email === '') {
            errorMessage = "Email can't be empty";
        } else {
            const validEmail = emailRegex.test(email);
            if (!validEmail) {
                errorMessage = "Please enter a valid email"
            }
        }
        if (errorMessage !== '') {
            setError(prev => {
                return {
                    ...prev,
                    email: errorMessage
                }
            })
            return false;
        }
        return true;
    }

    const validatePassword = () => {
        let errorMessage = '';
        if (password === '') {
            errorMessage = "Password can't be empty";
        } else if (password.length < 6) {
            errorMessage = "Password should be atleast 6 characters long"
        }

        if (errorMessage) {
            setError(prev => {
                return {
                    ...prev,
                    password: errorMessage
                }
            })
            return false;
        }
        return true;

    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setError({
            email: '',
            password: ''
        })
        event?.preventDefault();
        const emailErr = !validateEmail();
        const passwordErr = !validatePassword();
        if (!emailErr && !passwordErr) {
            const result = await makeCall({
                url: `${mode}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                key: mode,
                body: { email, password }
            })
            setCookie('authToken', result?.token, { maxAge: result?.expiresIn })
            router.push('/books');
        }
    }

    return (
        <Box sx={containerSx}>
            <Typography sx={{ color: '#162F3B', fontSize: '20px', letterSpacing: 1.25 }}>
                {mode === 'signup' ? 'SIGN UP' : 'LOGIN'}
            </Typography>
            <Box sx={{ display: 'flex', columnGap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={labelSx}>EMAIL*</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                    {
                        error.email && (
                            <Typography sx={{ color: 'red', fontSize: '10px' }}>{error.email}</Typography>
                        )
                    }
                </Box>

            </Box>


            <Box sx={{ display: 'flex', columnGap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={labelSx}>PASSWORD*</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField value={password} onChange={event => { setPassword(event.target.value) }} type='password' sx={{
                        '& .MuiInputBase-root': {
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            height: '40px'
                        },
                        width: '300px'

                    }} />
                    {
                        error.password && (
                            <Typography sx={{ color: 'red', fontSize: '10px' }}>{error.password}</Typography>
                        )
                    }
                </Box>


            </Box>

            <Button onClick={handleSubmit} type='submit'>Submit</Button>
        </Box>
    )
}

export default AuthenticationForm