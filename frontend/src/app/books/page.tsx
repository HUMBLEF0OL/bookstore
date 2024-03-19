"use client"
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, InputBase, Pagination, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

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
    const [data, setData] = useState<{ books: bookType[], count: number }>({ books: [], count: 0 });
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async (nextPage = 1) => {
        let data = await fetch(`http://localhost:5000/book?limit=${LIMIT}&offset=${nextPage}`)
        const result = await data.json();
        setData({
            books: result.books,
            count: result.totalCount
        });
    }

    const handleClick = (isbn: string) => {
        router.push(`/books/${isbn}`)
    }

    const handlePageChange = (event: any, nextPage: number) => {
        console.log("next page is ", nextPage)
        setPage(nextPage);
        fetchData(nextPage);
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

    const SearchBar = () => {
        return (
            <Box>
                <SearchIcon />
                <InputBase placeholder='Search...' inputProps={{ "aria-label": 'search' }} sx={{
                    padding: '8px 8px 8px 0px',

                }} />
            </Box>
        )
    }

    return (
        <Box sx={boxSx}>
            <Box sx={{ display: 'flex', columnGap: 1 }}>
                <Button>
                    Old to New
                </Button>
                <Button> A-Z ⬆️ | Z-A ⬇️</Button>
                <SearchBar />
            </Box >
            <Box sx={{ display: 'flex', flexDirection: 'flow', flexWrap: 'wrap', justifyContent: 'center' }}>
                {

                    data.books.map((book, index) => {
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
                count={Math.ceil(data.count / LIMIT) || 1}
                variant='outlined'
                shape='rounded'
                sx={paginationSx}
                page={page}
                onChange={handlePageChange}
            />
        </Box>
    )
}

export default page