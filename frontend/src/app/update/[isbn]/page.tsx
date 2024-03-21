"use client"
import { bookDataProps } from '@/app/books/[isbn]/page';
import { Button, Grid, TextField, TextareaAutosize, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
const page = () => {
    const [bookData, setBookData] = useState<bookDataProps | null>(null);
    const params = useParams();

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

    const inputSx = {
        backgroundColor: 'white',
        height: '50px',
        color: 'black'
    }

    const updateData = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof bookDataProps) => {
        if (bookData) {
            setBookData((prev): bookDataProps => {
                return {
                    ...prev,
                    [key]: event.target.value
                } as bookDataProps
            })
        }
    }

    const handleSubmit = async () => {
        if (bookData) {
            const { _id, ...rest } = bookData;
            console.log(rest);
            let data = await fetch(`http://localhost:5000/book/updatebook/${params.isbn}`, {
                method: 'PATCH',
                body: JSON.stringify(rest),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await data.json();

        }
    }


    return (
        <>
            {
                bookData ? (
                    <Grid container sx={dataDisplaySx} >
                        <Grid item>
                            <Typography component={'span'} sx={keyHeadingSx}>
                                TITLE :&nbsp;
                            </Typography>
                            <TextField value={bookData.title} onChange={(event) => { updateData(event, "title") }} sx={inputSx} />
                        </Grid>

                        <Grid item>
                            <Typography component={'span'} sx={keyHeadingSx}>
                                ISBN :&nbsp;
                            </Typography>
                            <TextField value={bookData.isbn} onChange={(event) => { updateData(event, "isbn") }} sx={inputSx} />

                        </Grid>

                        <Grid item>
                            <Typography component={'span'} sx={keyHeadingSx}>
                                PAGE COUNT :&nbsp;
                            </Typography>
                            <TextField value={bookData.pageCount} onChange={(event) => { updateData(event, "pageCount") }} sx={inputSx} />
                        </Grid>

                        <Grid item>
                            <Typography component={'span'} sx={keyHeadingSx}>
                                STATUS :&nbsp;
                            </Typography>
                            <TextField value={bookData.status} onChange={(event) => { updateData(event, "status") }} sx={inputSx} />
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
                            <TextareaAutosize value={bookData.longDescription} onChange={(event) => { updateData(event, "longDescription") }} minRows={5} maxRows={10} />
                        </Grid>

                        <Grid item>
                            <Button onClick={handleSubmit} sx={buttonSx}>
                                PUSH DATA
                            </Button>


                        </Grid>
                    </Grid>
                ) : (
                    <Typography>Loading...</Typography>

                )
            }
        </>
    )
}

export default page