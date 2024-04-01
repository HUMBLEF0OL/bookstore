"use client"
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, InputBase, Pagination, ToggleButton, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { makeCall } from '@/services/api.service';

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

const notFoundImage = 'https://c4.wallpaperflare.com/wallpaper/198/872/888/numbers-404-not-found-simple-background-minimalism-wallpaper-thumb.jpg';

const page = () => {
    const router = useRouter();
    const [data, setData] = useState<{ books: bookType[], count: number }>({ books: [], count: 0 });
    const [page, setPage] = useState(1);

    const [dateFilter, setDateFilter] = useState<'old' | 'new'>('old');

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async (nextPage = 1, searchString = '', sortDate = 'old') => {
        const result = await makeCall({
            url: `book?limit=${LIMIT}&offset=${nextPage}&searchString=${searchString}&sortBy=${sortDate}`,
            method: 'GET',

        });
        // const setCookieHeaders = resp?.headers?.getAll('Set-Cookie');
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

    const handleSortDate = () => {
        const updatedDateFilter = dateFilter === 'old' ? 'new' : 'old';
        setDateFilter(updatedDateFilter);
        fetchData(1, '', updatedDateFilter);
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
        objectFit: 'contain',
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
                <Typography component={'div'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '260px' }}>
                    {authors.map((current, index) => (
                        // <Typography component={'span'} key={index}>
                        <>
                            {current} <span> &#183;</span>
                        </>
                        // </Typography>
                    ))}
                </Typography >
            )

        } else {
            return (
                <>
                    <Typography component={'div'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '260px' }}>
                        {authors[0]} &#183; &nbsp;{authors[1]}...
                    </Typography>
                    {/* <Typography component={'span'}>

                    </Typography> */}
                </>
            )
        }
    }

    const SearchBar = () => {
        const [searchString, setSearchString] = useState('');

        const debouncer = (executable: Function, delay: number) => {
            let timer: ReturnType<typeof setInterval> | null = null;
            return (...args: any[]) => {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    executable(...args);
                }, delay)
            }
        }

        const searchBookTitle = (searchString: string) => {
            fetchData(1, searchString);
            setSearchString('')
        }
        const handleSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchString(event?.target.value);
            debouncerWrapper.current(event.target.value);
        }
        const debouncerWrapper = useRef(debouncer(searchBookTitle, 1500));
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: '40px',
                backgroundColor: 'white',
                color: 'black',
                border: '10px solid white',
                borderRadius: '40px'
            }}>
                <SearchIcon />
                <InputBase placeholder='Search...' inputProps={{ "aria-label": 'search' }} sx={{
                    padding: '8px 8px 8px 0px',
                    backgroundColor: 'white',
                    height: '35px'

                }}
                    value={searchString}
                    onChange={handleSearchString}
                />
            </Box>
        )
    }

    return (
        <Box sx={boxSx}>
            <Box sx={{ display: 'flex', columnGap: 1, mt: 2, mr: 1, justifyContent: 'end' }}>
                <Button onClick={handleSortDate} sx={{ backgroundColor: '#4D4855', color: 'white' }}>
                    {dateFilter === 'old' ? 'Old to New' : 'New to Old'}
                </Button>
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
                                    image={book.thumbnailUrl || notFoundImage}
                                    component={'img'}
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