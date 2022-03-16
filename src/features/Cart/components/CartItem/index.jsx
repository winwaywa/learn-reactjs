import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { STATIC_HOST } from 'constants';
import { THUMBNAIL_PLACEHOLDER } from 'constants';
import { Button, Typography } from '@mui/material';
import { formatPrice } from 'utils';

CartItem.propTypes = {
    item: PropTypes.object,
};

function CartItem({ item }) {
    const { id, product, quantity } = item;
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;

    return (
        <Box className="cart__item">
            <Box>
                <img className="cart__thumbnail" src={thumbnailUrl} alt={item.product.name}></img>
            </Box>
            <Typography>{product.name}</Typography>
            <Box>
                <Button>Xoá</Button>
            </Box>
            <Box className="product__price">
                <Box mr={2} component="span" className="product__sale-price">
                    {formatPrice(product.salePrice)}
                </Box>
                {Boolean(product.promotionPercent) ? (
                    <Box mr={2} component="span" className="product__original-price">
                        {formatPrice(product.originalPrice)}
                    </Box>
                ) : (
                    ''
                )}
                {Boolean(product.promotionPercent) && (
                    <Box className="product__promotion-percent">{`-${product.promotionPercent}%`}</Box>
                )}
            </Box>
            <Box>Số lượng:{quantity}</Box>
        </Box>
    );
}

export default CartItem;
