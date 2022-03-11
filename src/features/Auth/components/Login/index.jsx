import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login } from 'features/Auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import LoginForm from '../LoginForm';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch();

    //show noti
    const { enqueueSnackbar } = useSnackbar();
    const showNoti = (alert, state) => {
        enqueueSnackbar(alert, { variant: state });
    };

    const handleSubmit = async (values) => {
        try {
            //auto set username = email
            values.username = values.email;

            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            showNoti('Đăng nhập thành công', 'success');
            //close dialog
            const { closeDialog } = props;
            if (closeDialog) closeDialog();

            // console.log({ 'new user': user });
        } catch (error) {
            showNoti(error.message, 'error');
            console.log('Có lỗi:', error);
        }
    };

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;
