import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { form, name, label, disabled } = props;
    const { errors, formState } = form;

    // const hasError = formState.touched[name] && errors[name]; //có touch và có lỗi
    // console.log({ touched: formState.touched[name], error: errors[name] });

    const hasError = errors[name]; // chỉ cần có lỗi

    return (
        <Controller
            name={name}
            control={form.control}
            as={TextField}
            //những cái ở dưới nó sẽ bỏ vào TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={label}
            disabled={disabled}
            //in lỗi
            error={!!hasError}
            helperText={errors[name]?.message}
        ></Controller>
    );
}

export default InputField;
