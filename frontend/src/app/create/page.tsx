import { Label } from '@mui/icons-material'
import { FormControl, TextField, Typography } from '@mui/material'
import React from 'react'

const page = () => {
    return (
        <>
            <Typography>simple text to be displayed</Typography>
            <FormControl>
                <Label id='title'>
                    Title
                </Label>
                <TextField >

                </TextField>
            </FormControl>
        </>
    )
}

export default page