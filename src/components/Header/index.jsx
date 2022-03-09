import CodeIcon from '@mui/icons-material/Code';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Register from 'features/Auth/components/Register';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

export default function Header() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <AppBar className="menu" position="static">
                <Toolbar>
                    <CodeIcon />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Shop
                    </Typography>
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
                    <Button
                        className="menu__btn menu__btn--register"
                        color="inherit"
                        onClick={handleClickOpen}
                    >
                        Đăng kí
                    </Button>
                </Toolbar>
            </AppBar>
            {/* dialog */}
            <Dialog open={open}>
                {/* <DialogTitle>Đăng kí</DialogTitle> */}
                <DialogContent>
                    <Register closeDialog={handleClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
