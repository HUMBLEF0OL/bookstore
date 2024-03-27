import AuthenticationForm from '@/components/AuthenticationForm/AuthenticationForm'
import { Box } from '@mui/material'
import React from 'react'

const page = () => {
    return (
        <Box>
            <AuthenticationForm mode='login' />
        </Box>
    )
}

export default page