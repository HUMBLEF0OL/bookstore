"use client"
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export type bookDataProps = {
    _id: string,
    title: string,
    isbn: string,
    pageCount: number,
    thumbnailUrl: string,
    longDescription: string,
    status: string,
    authors: [string],
    categories: [string],

}

const notFoundImage = 'https://c4.wallpaperflare.com/wallpaper/198/872/888/numbers-404-not-found-simple-background-minimalism-wallpaper-thumb.jpg';

const page = () => {
    const params = useParams();
    const [bookData, setBookData] = useState<bookDataProps | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        let data = await fetch(`http://localhost:5000/book/isbn/${params.isbn}`)
        const result = await data.json();
        setBookData(result.result);
    }

    const dataDisplaySx = {
        flexDirection: 'column',
        rowGap: '6px',
        flex: 1
    }

    const containerSx = {
        columnGap: 4,
        p: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
    const keyHeadingSx = {
        fontWeight: 600,
        color: '#87CEEB'
    }
    const buttonSx = {
        '&:hover': {
            backgroundColor: 'white'
        }
    }

    const handleEdit = () => {
        router.push(`/update/${params.isbn}`);

    }
    const handleDelete = async () => {
        try {
            let resp = await fetch(`http://localhost:5000/book/${params.isbn}`, { method: 'DELETE' })
            const result = await resp.json();
            router.push('/books')
        } catch (err) {
            console.log("FAILED TO DELETE!", err);
        }

    }

    return (
        <>
            {
                bookData ? (
                    <Grid container sx={containerSx}>
                        <Grid item sx={{ width: 'fit-content' }}>
                            <img src={bookData.thumbnailUrl || notFoundImage} alt={bookData.title} style={{ height: 'fit-content', width: 'fit-width' }} />
                        </Grid>
                        <Grid item container sx={dataDisplaySx} >
                            <Grid item>
                                <Typography component={'span'} sx={keyHeadingSx}>
                                    TITLE :&nbsp;
                                </Typography>
                                <Typography component={'span'}>
                                    {bookData.title}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography component={'span'} sx={keyHeadingSx}>
                                    ISBN :&nbsp;
                                </Typography>
                                <Typography component={'span'}>
                                    {bookData.isbn}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography component={'span'} sx={keyHeadingSx}>
                                    PAGE COUNT :&nbsp;
                                </Typography>
                                <Typography component={'span'}>
                                    {bookData.pageCount}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography component={'span'} sx={keyHeadingSx}>
                                    STATUS :&nbsp;
                                </Typography>
                                <Typography component={'span'}>
                                    {bookData.status}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography component={'span'} sx={keyHeadingSx}>
                                    AUTHORS :&nbsp;
                                </Typography>
                                <Typography component={'span'}>
                                    {bookData.authors}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography component={'span'} sx={keyHeadingSx}>
                                    CATEGORIES: &nbsp;
                                </Typography>
                                <Typography component={'span'}>
                                    {bookData.categories}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography sx={keyHeadingSx}>
                                    DESCRIPTION :
                                </Typography>
                                <Typography sx={{ textAlign: 'justify' }}>
                                    {bookData.longDescription}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Button onClick={handleEdit} sx={buttonSx}>
                                    EDIT DATA
                                </Button>

                                <Button onClick={handleDelete} sx={buttonSx}>
                                    DELETE DATA
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid >
                ) : (
                    <Typography>Loading...</Typography>
                )
            }
        </>
    )
}

export default page