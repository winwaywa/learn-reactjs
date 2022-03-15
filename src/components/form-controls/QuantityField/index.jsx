import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { FormHelperText, IconButton, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function QuantityField(props) {
    const { form, name, label, disabled } = props;
    const { errors, setValue } = form;

    const hasError = errors[name]; // chỉ cần có lỗi

    return (
        <div>
            <FormControl
                error={!!hasError}
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
            >
                <Typography>{label}</Typography>
                <Controller
                    //controller
                    name={name}
                    control={form.control}
                    render={({ onChange, onBlur, value, name }) => (
                        <Box>
                            {/* setValues lại khi click trừ */}
                            <IconButton onClick={() => setValue(name, Number.parseInt(value) - 1)}>
                                <RemoveCircleOutline />
                            </IconButton>
                            <OutlinedInput
                                id={name}
                                type="number"
                                disabled={disabled}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                name={name}
                            />
                            <IconButton onClick={() => setValue(name, Number.parseInt(value) + 1)}>
                                <AddCircleOutline />
                            </IconButton>
                        </Box>
                    )}
                />
                {/* in lỗi */}
                <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl>
        </div>
    );
}

export default QuantityField;
