import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
    const handleChange = (event, newValue) => {
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <Box>
            <Tabs
                value={currentSort}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab value="salePrice:ASC" label="Giá thấp tới cao" />
                <Tab value="salePrice:DESC" label="Giá cao tới thấp" />
            </Tabs>
        </Box>
    );
}

export default ProductSort;
