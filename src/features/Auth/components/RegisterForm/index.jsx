import React from 'react';
import PropTypes from 'prop-types';
// import InputField from '../../../../components/form-controls/InputField';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';

//validate với yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    // validate vs yup
    const schema = yup
        .object()
        .shape({
            fullName: yup
                .string()
                .required('Please enter your fullname')
                .test(
                    'Nên nhập ít nhất 2 từ',
                    'Nhập ít nhất 2 từ',
                    (value) => value.split(' ').length >= 2 // hàm tự đặt
                ),
            email: yup
                .string()
                .required('Please enter your email')
                .email('Vui lòng nhập email hợp lệ'),
            password: yup
                .string()
                .required('Please enter your password')
                .min(6, 'Mật khẩu ít nhất 6 kí tự'),
            retypePassword: yup
                .string()
                .required('Please retype your password')
                .oneOf([yup.ref('password')], 'Password nhập lại không giống nhau'),
        })
        .required();

    //useForm
    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },

        //validate vs yup
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) await onSubmit(values);

        //reset form sau khi submit xong
        form.reset();
    };

    //xem có đang submit ko
    const { isSubmitting } = form.formState;

    return (
        <div>
            {isSubmitting && <LinearProgress />}
            <Avatar
                style={{ textAlign: 'center', margin: '0 auto' }}
                sx={{ m: 1, bgcolor: 'secondary.main' }}
            >
                <LockOutlinedIcon />
            </Avatar>
            <Typography style={{ textAlign: 'center' }} component="h1" variant="h5">
                Sign up
            </Typography>
            {/* do đang ở mode onSubmit nên khi submit mới validate */}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retypePassword" label="Retype password" form={form} />
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Create an account
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;
