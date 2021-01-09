import React from 'react';
import {Btn} from '../../components/Controls/Button/Button';
import { Grid , TextField , InputAdornment, Button, IconButton} from "@material-ui/core"
import Logo from "../../assets/images/ScreenitOriginal.png"
import SidebarLogo from "../../assets/images/screeningTemp.jpg"
import History from '../../routes/History';
import { AccountCircle, LockRounded, Visibility } from '@material-ui/icons'
class Login extends React.Component {

    // this method is only to trigger route guards , remove and use your own logic
    handleLogin = () => {
        localStorage.setItem('token','token');
        History.push('/')
    }

    render(){
        return(
            <div>
                <Grid container style={{ minHeight: '100vh'}}>
                    <Grid item xs={12} sm={6}>
                    <img 
                      src={SidebarLogo} 
                      style={{ width: '100%', height: '100vh', objectFit: 'cover', overflow: 'hidden'}}
                      alt="ScreenIt"
                     />
                    </Grid>
                    <Grid container item xs={12} sm={6} alignItems="center" direction="column" style={{padding: 10}}>
                        <div />
                        <div style={{ display: "flex", flexDirection: "column", maxWidth: 400, minWidth: 300 }}>
                            <Grid container jutify="center">
                                        <img 
                                        src={Logo} 
                                        width={300} 
                                        alt="logo" 
                                        />
                            </Grid>
                            <TextField label="Username" margin="normal" 
                            InputProps={{ 
                                startAdornment:(
                                 <InputAdornment position="start">
                                     <AccountCircle />
                                </InputAdornment>
                                ), }}
                            />
                            <TextField type="password" label="Password" margin="normal"
                             InputProps={{ 
                                startAdornment:(
                                 <InputAdornment position="start">
                                     <LockRounded />
                                </InputAdornment>
                                ),
                                // endAdornment:(
                                //     <InputAdornment position="end" >
                                //         <IconButton outline>
                                //             <Visibility fontSize='small' />
                                //         </IconButton>
                                //    </InputAdornment>
                                //    )
                            }}
                            />
                            <div style={{ height: 20}} />
                            <Button color="primary" variant="contained" onClick={this.handleLogin}>
                                Log In
                            </Button>
                            <div style={{ height: 20}} />
                            <Button>Register</Button>
                        </div>
                        <Grid container justify="center">
                            <Grid item>
                                <Button>Forgot Passowrd?</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default Login;