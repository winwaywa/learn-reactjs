import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { cartItemsTotalSelector } from './selector';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { formatPrice } from 'utils';
import CartList from './components/CartList';

CartFeature.propTypes = {};

function CartFeature(props) {
    const cartTotal = useSelector(cartItemsTotalSelector);
    const cartItems = useSelector((state) => state.cart.cartItems);

    console.log(cartItems);
    return (
        <Box>
            <CartList cartItems={cartItems} />
            <Box pr={10} textAlign="right">
                <Typography>{`Total: ${formatPrice(cartTotal)}`}</Typography>
            </Box>
        </Box>
    );
}

export default CartFeature;
