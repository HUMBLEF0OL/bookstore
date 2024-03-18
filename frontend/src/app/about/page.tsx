import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const imageUrl = 'https://images.unsplash.com/photo-1535905496755-26ae35d0ae54?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const page = () => {
    const containerSx = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        maxWidth: '550px',
        m: 2,
        backgroundImage: `url(${imageUrl})`
    }
    const headingSx = {
        // m: 2,
        mb: 2,
        fontWeight: 500,
        letterSpacing: 2
    }
    const contentSx = {
        textAlign: 'justify'
    }
    return (
        <Box sx={containerSx} >
            <Box>
                <img width={100} height={100} src="https://images.unsplash.com/photo-1535905496755-26ae35d0ae54?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="book" />
            </Box>
            <Typography variant='h4' sx={headingSx}>ABOUT US</Typography>
            <Typography variant='body1' sx={contentSx}>
                About Us: Bookworm Haven

                Welcome to Bookworm Haven, a cozy sanctuary for book lovers of all ages. Nestled in the heart of town, Bookworm Haven is more than just a bookstore; it's a literary oasis where stories come to life.

                Our shelves are stocked with a handpicked selection of books, ranging from timeless classics to the latest bestsellers. Whether you're a fan of fiction, non-fiction, or anything in between, you're sure to find a book that speaks to you at Bookworm Haven.

                But Bookworm Haven is more than just a place to buy books. It's a community hub where bookworms can gather, connect, and share their love for reading. Join us for our book clubs, author signings, and other exciting events that celebrate the joy of reading.

                At Bookworm Haven, we believe that books have the power to inspire, educate, and entertain. Our mission is to ignite a passion for reading in everyone who walks through our doors. So come on in, grab a book, and make yourself at home at Bookworm Haven.
            </Typography>
        </Box>
    )
}

export default page