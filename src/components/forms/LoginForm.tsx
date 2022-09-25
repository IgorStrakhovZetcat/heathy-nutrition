import { Avatar, Box, Button, Container, createTheme, IconButton, Link, TextField, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import LoginData from "../../models/LoginData";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';
import NetworkIcon from "../../models/NetworkIkon";

type Props = {
  submitFn: (loginData: LoginData)=>Promise<boolean>;
  networks?: NetworkIcon[]
}
function Copyright(props: any) {
return (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://healthy-nutrition-cd61b.web.app/login">
      Healthy Nutrition
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);
}

const theme = createTheme();

export default function LoginForm({submitFn, networks}: Props) {
  const [flAlert, setAlert] = React.useState<boolean>(false);
const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const loginData = {email: data.get('email') as string, password: data.get('password') as string};
  if(!(await submitFn(loginData))) {
      setAlert(true)
  }
  
};
function getNetworkIcons(): React.ReactNode {
  if (networks) {
      return networks.map(nw => <IconButton key={nw.name}
         onClick={() =>
          submitFn({ email: nw.name, password: '' })}
           >

          <Avatar src={nw.iconURL} sx={{width:{xs: '6vh', sm: '6vw', lg: '3vw'}}}  />
      </IconButton>)
  }
}

return (
  <ThemeProvider theme={theme}>
    <Alert severity="info" >Hello, I'm Igor Strakhov and this is my project! If you want to check everything, you need to sign in!</Alert>
        <Alert severity="info" >And if you don't want to use some authentication, login: user@gmail.com, password: user1234</Alert>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: {xs: 15, sm: 1, md: 15},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
          {flAlert && <Alert onClose={() => setAlert(false)} severity='error'
           sx={{width: '50vw', mb: {xs: 5,sm:1,md: 5}}}>Wrong Credentials</Alert>}
        <Avatar sx={{  bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        
        <Box component="form" onSubmit={handleSubmit} sx={{mt: {xs: 8, sm: 2, md:10}}} >
          <TextField
            
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            
            autoFocus
          />
          <TextField
          sx={{mt: {xs: 5, sm:2, md: 5}}}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
           
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: {xs: 5, sm:2, md: 5}}}
          >
            Sign In
          </Button>
          { (networks && networks.length != 0) && <Box>
           Or with <br/>  
            {getNetworkIcons()}
          </Box>}
        </Box>
      </Box>
      <Copyright sx={{mt: {xs: 5, sm:2, md: 5}  }} />
    </Container>
  </ThemeProvider>
);
}

