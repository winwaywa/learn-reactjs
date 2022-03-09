import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from 'features/Auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
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

            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            showNoti('Đăng kí thành công', 'success');
            //close dialog
            const { closeDialog } = props;
            if (closeDialog) closeDialog();

            // console.log({ 'new user': user });
        } catch (error) {
            showNoti('Đăng kí thất bại', 'error');
            // console.log('Có lỗi:', error);
        }
    };

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;
