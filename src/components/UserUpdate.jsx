import React,{useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function UserUpdate() {
	const {id} = useParams();
	const [fname,setFname] =useState('')
	const [lname,setLname] =useState('')
	const [username,setUsername] =useState('')
	const [avatar,setAvatar] =useState('')

    useEffect(()=>{
		//Fetch data
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://www.melivecode.com/api/users/"+id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result['status']==='ok'){
                    setFname(result['user']['fname'])
                    setLname(result['user']['lname'])
                    setUsername(result['user']['username'])
                    setAvatar(result['user']['avatar'])
                }
            })
            .catch(error => console.log('error', error));
    },(id))


	//Submit to update
	const handleSubmit =(e)=>{
		e.preventDefault()
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
            "id": id,
            "fname": fname,
            "lname": lname,
            "username": username,
            "email": username,
            "avatar": avatar
		});

		var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
		};

		fetch("https://www.melivecode.com/api/users/update", requestOptions)
		.then(response => response.json())
		.then(result => {
			alert(result['message'])
			if(result['status'] === 'ok'){
				window.location.href='/'
			}
		})
		.catch(error => console.log('error', error));
	}
	return (
		<div className='w-full h-screen bg-gradient-to-r from-[#60842b] to-[#094f00] text-black relative'>
			<div className='max-w-[1000px] mx-auto p-4 flex flex-col w-full h-full'>
				<div className='bg-white p-8 rounded-lg'>
					<Box align='left' sx={{flexGrow:1}} className='my-4'>
						<Typography variant='h6'>Update user</Typography>
					</Box>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField id="fname" label="First Name" variant="outlined" fullWidth required value={fname} onChange={(e)=>setFname(e.target.value)}/>
							</Grid>
							<Grid item xs={6}>
								<TextField id="lname" label="Last Name" variant="outlined" fullWidth required value={lname} onChange={(e)=>setLname(e.target.value)}/>
							</Grid>
							<Grid item xs={12}>
								<TextField id="username" label="Email" variant="outlined" fullWidth required value={username} onChange={(e)=>setUsername(e.target.value)}/>
							</Grid>
							<Grid item xs={12}>
								<TextField id="avatar" label="Avatar *img link" variant="outlined" fullWidth required value={avatar} onChange={(e)=>setAvatar(e.target.value)}/>
							</Grid>
							<Grid item xs={12}>
								<Button type='submit' variant="contained">Update</Button>
							</Grid>
						</Grid>
					</form>
				</div>
				
			</div>
		</div>
		
	);
}