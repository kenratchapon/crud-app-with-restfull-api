import React,{useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function UserCreate() {
	
	const [fname,setFname] =useState('')
	const [lname,setLname] =useState('')
	const [username,setUsername] =useState('')
	const [avatar,setAvatar] =useState('')

	//Submit to Create
	const handleSubmit =(e)=>{
		e.preventDefault()
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			"fname": fname,
			"lname": lname,
			"username": username,
			"email": username,
			"avatar": avatar
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("https://www.melivecode.com/api/users/create", requestOptions)
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
		<div className='w-full h-screen bg-gradient-to-r from-[#43005b] to-[#180076] text-black relative'>
			<div className='max-w-[1000px] mx-auto p-4 flex flex-col w-full h-full'>
				<div className='bg-white p-8 rounded-lg'>
					<Box align='left' sx={{flexGrow:1}}>
						<Typography variant='h6'>Create user</Typography>
					</Box>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField id="fname" label="First Name" variant="outlined" fullWidth required onChange={(e)=>setFname(e.target.value)}/>
							</Grid>
							<Grid item xs={6}>
								<TextField id="lname" label="Last Name" variant="outlined" fullWidth required onChange={(e)=>setLname(e.target.value)}/>
							</Grid>
							<Grid item xs={12}>
								<TextField id="username" type='email' label="Email" variant="outlined" fullWidth required onChange={(e)=>setUsername(e.target.value)}/>
							</Grid>
							<Grid item xs={12}>
								<TextField id="avatar" label="Avatar *img link" variant="outlined" fullWidth required onChange={(e)=>setAvatar(e.target.value)}/>
							</Grid>
							<Grid item xs={12}>
								<Button type='submit' variant="contained">Create</Button>
							</Grid>
						</Grid>
					</form>
				</div>
			</div>
		</div>
	);
}