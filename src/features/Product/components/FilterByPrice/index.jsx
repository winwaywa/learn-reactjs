import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography } from '@mui/material';

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
    const [values, setValues] = React.useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });
    const handleChange = (e) => {
        setValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = () => {
        if (onChange) onChange(values);
        // setValues({ salePrice_gte: 0, salePrice_lte: 0 });
    };
    return (
        <Box pt={3}>
            <Typography variant="subtitle2">GIÁ</Typography>
            <Box pt={0} pb={1} className="filter__price">
                <TextField
                    fullWidth
                    name="salePrice_gte"
                    variant="standard"
                    value={values.salePrice_gte}
                    onChange={handleChange}
                />
                <span>-</span>
                <TextField
                    fullWidth
                    name="salePrice_lte"
                    variant="standard"
                    value={values.salePrice_lte}
                    onChange={handleChange}
                />
            </Box>
            <Button variant="outlined" size="small" onClick={handleSubmit}>
                Áp dụng
            </Button>
        </Box>
    );
}

export default FilterByPrice;
