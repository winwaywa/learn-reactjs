import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function PasswordField(props) {
    const { form, name, label, disabled } = props;
    const { errors, formState } = form;

    // const hasError = formState.touched[name] && errors[name]; //có touch và có lỗi
    console.log({ touched: formState.touched[name], error: errors[name] });

    const hasError = errors[name]; // chỉ cần có lỗi

    //show/hide pass
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            {/* <Controller
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
            /> */}

            <FormControl error={!!hasError} fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Controller
                    //controller
                    name={name}
                    control={form.control}
                    render={({ onChange, onBlur, value, name }) => (
                        <OutlinedInput
                            id={name}
                            type={showPassword ? 'text' : 'password'}
                            label={label}
                            disabled={disabled}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            name={name}
                            // button ẩn/hiện pass
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )}
                />
                {/* in lỗi */}
                <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl>
        </div>
    );
}

export default PasswordField;
