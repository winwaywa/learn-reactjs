import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import CartItem from '../CartItem';
import { Paper } from '@mui/material';

CartList.propTypes = {
    cartItems: PropTypes.array,
};

function CartList({ cartItems }) {
    return (
        <Box component="ul" className="cart__list">
            <Paper>
                {cartItems.map((item) => (
                    <Box component="li">
                        <CartItem item={item} />
                    </Box>
                ))}
            </Paper>
        </Box>
    );
}

export default CartList;
