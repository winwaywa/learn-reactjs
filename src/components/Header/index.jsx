import { AccountCircle, AddBox } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../logo.svg';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};

export default function Header() {
    const dispatch = useDispatch();

    const loggedUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedUser;

    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState(MODE.LOGIN);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    //logout
    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action);
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar className="menu" position="static">
                <Toolbar>
                    <Box variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <img className="logo" src={logo} alt="logo" />
                    </Box>

                    <NavLink to="/" exact>
                        <Button className="menu__btn menu__btn--home" color="inherit">
                            Home
                        </Button>
                    </NavLink>
                    <NavLink to="/todos">
                        <Button className="menu__btn menu__btn--todos" color="inherit">
                            Todos
                        </Button>
                    </NavLink>
                    <NavLink to="/albums">
                        <Button className="menu__btn menu__btn--albums" color="inherit">
                            Albums
                        </Button>
                    </NavLink>
                    <NavLink to="/products" exact>
                        <Button className="menu__btn menu__btn--home" color="inherit">
                            Products
                        </Button>
                    </NavLink>
                    {!isLoggedIn && (
                        <Button
                            className="menu__btn menu__btn--login"
                            color="inherit"
                            onClick={handleClickOpen}
                        >
                            Đăng nhập
                        </Button>
                    )}
                    {isLoggedIn && (
                        <IconButton color="inherit" onClick={handleMenuClick}>
                            <AccountCircle />
                            {/* <p>{loggedUser.fullName}</p> */}
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                // anchorOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'left',
                // }}
                // transformOrigin={{
                //     vertical: 'top',
                //     horizontal: 'left',
                // }}
            >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

            {/* dialog */}
            <Dialog open={open}>
                {/* <DialogTitle>Đăng kí</DialogTitle> */}
                <IconButton className="btn--close" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account. Login here!
                                </Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} />
                            <Box textAlign="center" onClick={() => setMode(MODE.REGISTER)}>
                                <Button color="primary">
                                    Don't have an account. Register here!
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
