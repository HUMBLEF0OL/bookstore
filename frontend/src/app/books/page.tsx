"use client"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Pagination, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type bookType = {
    _id: string,

    title: string
    isbn: string,
    pageCount: number,
    publishedDate: Date,
    thumbnailUrl: string,
    shortDescription: string,
    longDescription: string
    status: string
    authors: string[],
    categories: string[]
}

const LIMIT = 12;

const page = () => {
    const router = useRouter();
    const [data, setData] = useState<bookType[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData().then((result) => {
            return result.json();
        }).then(result => {
            result = result.slice(0, 12);
            console.log(result)
            setData(result);
        });
    }, [])

    useEffect(() => {
        console.log(page)
    }, [page])

    const fetchData = async () => {
        const data = await fetch('http://localhost:5000/book')
        return data;
    }

    const handleClick = (isbn: string) => {
        router.push(`/books/${isbn}`)
    }

    const hanldePageChange = (event: any, nextPage: number) => {
        setPage(nextPage);
    }

    const boxSx = {
        display: 'flex',
        columnGap: 2,
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'end'
    }

    const cardSx = {
        width: '275px',
        height: '250px',
        m: 1,

    }

    const cardMediaSx = {
        height: '150px',
        backgroundSize: 'contain',
        backgroundColor: '#282C35'
    }

    const cardContentSx = {
        p: 1
    }

    const paginationSx = {
        display: 'flex',
        justifyContent: 'end',
        mr: 2,
        '& .MuiButtonBase-root': {
            backgroundColor: 'white',
            color: '#282C35',
            ':hover': {
                backgroundColor: '#D6DAE1'
            }
        },
        '& .MuiButtonBase-root.Mui-selected': {
            backgroundColor: 'black',
            color: 'white',
            border: '2px solid white',
            ':hover': {
                backgroundColor: '#282C35'
            }

        },
        '& .MuiPaginationItem-ellipsis ': {
            color: 'white'
        }
    }

    const renderAuthors = (authors: string[]) => {
        if (authors.length < 2) {
            return (
                <>
                    {authors.map((current, index) => (
                        <Typography component={'span'}>
                            {current} <span style={{ fontSize: '15px', height: '50px', width: '50px' }}>&#183;</span> &nbsp;
                        </Typography>
                    ))}
                </>
            )

        } else {
            return (
                <>
                    <Typography component={'span'}>
                        {authors[0]} &#183; &nbsp;
                    </Typography>
                    <Typography component={'span'}>
                        {authors[1]}...
                    </Typography>
                </>
            )
        }
    }


    return (
        <Box sx={boxSx}>
            <Box sx={{ display: 'flex', flexDirection: 'flow', flexWrap: 'wrap', justifyContent: 'center' }}>
                {

                    data?.map((book, index) => {
                        return (
                            <Card key={index} sx={cardSx}>
                                <CardMedia
                                    sx={cardMediaSx}
                                    title={book.title}
                                    image={book.thumbnailUrl || ""}
                                />
                                <CardContent sx={cardContentSx}>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {book.title}
                                    </Typography>
                                    {
                                        renderAuthors(book.authors)
                                    }
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'end' }}>
                                    <Button sx={{ p: 0 }} onClick={() => { handleClick(book.isbn) }}>
                                        MORE
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </Box>

            <Pagination
                count={10}
                variant='outlined'
                shape='rounded'
                sx={paginationSx}
                page={page}
                onChange={hanldePageChange}
            />
        </Box>
    )
}

export default page