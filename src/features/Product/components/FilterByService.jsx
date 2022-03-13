import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

FilterByService.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function FilterByService({ filters = {}, onChange }) {
    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (onChange) onChange({ [name]: checked });
    };

    return (
        <Box pt={3}>
            <Typography variant="subtitle2">DịCH VỤ</Typography>
            <ul>
                {[
                    { value: 'isPromotion', label: 'Có khuyến mãi' },
                    { value: 'isFreeShip', label: 'Miễn phí ship' },
                ].map((service) => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={service.value}
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByService;
