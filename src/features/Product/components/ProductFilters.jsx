import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './FilterByCategory';
import FilterByPrice from './FilterByPrice';
import { Box } from '@mui/material';
import FilterByService from './FilterByService';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
    const handleCategoryChange = (newCategoryId) => {
        if (onChange) {
            const newFilters = {
                ...filters,
                'category.id': newCategoryId,
            };
            onChange(newFilters);
        }
    };
    // price and service
    const handleChange = (values) => {
        if (onChange) {
            onChange(values);
        }
    };
    return (
        <Box padding={2}>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handleChange} />
            <FilterByService filters={filters} onChange={handleChange} />
        </Box>
    );
}

export default ProductFilters;
