import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { formatPrice } from 'utils';

ProductInfo.propTypes = {
    product: PropTypes.object,
};

function ProductInfo({ product = {} }) {
    const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;
    return (
        <Box class="product__box">
            <Typography component="h1" variant="h4">
                {name}
            </Typography>
            <Typography variant="body2" mt={2}>
                {shortDescription}
            </Typography>
            <Box mt={2} className="product__price">
                <Box mr={2} component="span" className="product__sale-price">
                    {formatPrice(salePrice)}
                </Box>
                {Boolean(promotionPercent) ? (
                    <Box mr={2} component="span" className="product__original-price">
                        {formatPrice(originalPrice)}
                    </Box>
                ) : (
                    ''
                )}
                {Boolean(promotionPercent) && (
                    <Box
                        component="span"
                        className="product__promotion-percent"
                    >{`-${promotionPercent}%`}</Box>
                )}
            </Box>
        </Box>
    );
}

export default ProductInfo;
