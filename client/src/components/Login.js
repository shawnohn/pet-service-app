import React, { useState } from 'react'
import {
    withStyles, InputLabel, Link, Typography, DialogTitle, DialogContentText,
    DialogContent, DialogActions, Dialog, TextField, Button, Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        // width: 'fit-content',
        width: '50vw'
    },
    title: {
        textAlign: 'center',
        fontWeight: '1000',

    },
    inputLabel: {
        marginTop: theme.spacing(3),
        fontWeight: '900',
        fontSize: '12px',
    },

})
function Login(props) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [loginErr, setLoginErr] = useState(false);
    const onLoginSubmit = () => {
        const isValid = validate();
        if (isValid) {
            axios.post('users/login', {
                userEmail: email,
                password: password
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log("success")
                        // update App.js state
                        props.updateUser({
                            loggedIn: true,
                            username: response.data.username
                        })
                        // clear form and set the sucessful switch to true
                        setEmail('');
                        setPassword('');
                        setEmailErr('');
                        setPasswordErr('');
                    }
                }).catch(error => {
                    setLoginErr(true);
                })
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoginErr(false);
    };

    const validate = () => {
        let emailErr = "";
        let passwordErr = "";

        if (!email.includes("@")) {
            emailErr = "Invalid email";
        }
        if (password.length < 6) {
            passwordErr = "Password Can not be less than 6 length";
        }

        if (emailErr || passwordErr) {
            setEmailErr(emailErr);
            setPasswordErr(passwordErr);
            return false;
        }

        return true;
    };
    const { classes } = props;
    return (
        <div>
            <Button size="large" variant="outlined" color="secondary" onClick={() => setOpen(!open)} style={{ marginRight: '17px' }}>
                LOGIN
                 </Button>
            <Dialog fullWidth={true} maxWidth='md' open={open} onClose={() => setOpen(!open)} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title" className={classes.title}>
                    <Typography variant="h4">Login</Typography>
                </DialogTitle>
                <DialogContent>
                    <form className={classes.form}>
                        <DialogContent className={classes.textFieldContainer}>
                            <InputLabel
                                color="secondary"
                                required={true}
                                className={classes.inputLabel}
                            >
                                EMAIL ADDRESS
                                </InputLabel>
                            <TextField
                                autoFocus
                                fullWidth
                                margin="dense"
                                id="email"
                                placeholder="Your Email"
                                type="email"
                                variant="outlined"
                                color="secondary"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <div className={classes.errMsg}>
                                {
                                    emailErr.length > 0 ? <Alert severity="error">{emailErr}</Alert> : ''
                                }
                            </div>
                            <br />
                            <InputLabel
                                color="secondary"
                                className={classes.inputLabel}
                            >
                                PASSWORD
                                </InputLabel>
                            <TextField

                                fullWidth
                                margin="dense"
                                id="email"
                                placeholder="Your password"
                                type="password"
                                variant="outlined"
                                color="secondary"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className={classes.errMsg}>
                                {
                                    passwordErr.length > 0 ? <Alert severity="error">{passwordErr}</Alert> : ''
                                }
                            </div>
                        </DialogContent >
                    </form>
                </DialogContent>
                <DialogActions className={classes.form}>
                    <Button variant="contained" color="secondary" size="large" onClick={onLoginSubmit} style={{ marginTop: '20px' }}>
                        Login
                        </Button>
                    <DialogContentText className={classes.inputLabel}>
                        Not a member? <Link href="#" color="secondary">Sign Up</Link>
                    </DialogContentText>
                </DialogActions>
            </Dialog>

            <Snackbar open={loginErr} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    Incorrect Email or Password!
                    </Alert>
            </Snackbar>
        </div>
    )

}

export default withStyles(useStyles)(Login);