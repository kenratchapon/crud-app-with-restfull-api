import React, { useState,useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography,Button, Paper,Avatar,Link, ButtonGroup } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Users() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        userGet()
    }, [])

    //Read
    const userGet = () =>{
        fetch("https://www.melivecode.com/api/users")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }

    //Delete
    const handleDelete =(id)=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "id": id
        });

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/users/delete", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['message'])
            if(result['status']==='ok'){
                userGet()
            }
        })
        .catch(error => console.log('error', error));
    }

    const handleEdit =(id)=>{
        window.location = '/update/' + id
    }
    return (
        <div className='w-full h-auto bg-gradient-to-r from-[#4C489E] to-[#6c006a]'>
        <Container maxWidth='lg' className='p-4'>
            <Paper className='p-8'>
                <Box display='flex'>
                    <Box align='left' sx={{flexGrow:1}}>
                            <Typography variant='h6'>Users</Typography>
                    </Box>
                    <Box align='right' sx={{flexGrow:1}}>
                        <Link href="create">
                            <Button variant="contained" style={{backgroundColor: "#E635E4"}}>Create</Button>
                        </Link>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Avatar</TableCell>
                            <TableCell align="left">First Name</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {items.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="center">
                                <Box className='flex justify-center'>
                                    <Avatar alt={row.username} src={row.avatar} />
                                </Box>
                            </TableCell>
                            <TableCell align="left">{row.fname}</TableCell>
                            <TableCell align="left">{row.lname}</TableCell>
                            <TableCell align="left">{row.username}</TableCell>
                            <TableCell align="right">
                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                    <Button style={{backgroundColor: "#FFE569"}} onClick={()=>handleEdit(row.id)} >Edit</Button>
                                    <Button style={{backgroundColor: "#F99B7D"}} onClick={()=>handleDelete(row.id)}>Del</Button>
                                </ButtonGroup>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </Paper>

        </Container>
        </div>
        
    );
}