import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { STATIC_HOST } from 'constants';
import { THUMBNAIL_PLACEHOLDER } from 'constants';

ProductItem.propTypes = {
    product: PropTypes.object,
};

function ProductItem({ product }) {
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;
    return (
        <Box className="product" padding={1}>
            <Box padding={1} minHeight={200}>
                <img className="product__thumbnail" src={thumbnailUrl} alt={product.name} />
            </Box>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                <Box component="span" fontSize={16} fontWeight="bold" mr={1}>
                    {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
                        product.salePrice
                    )}
                </Box>
                {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ''}
            </Typography>
        </Box>
    );
}

export default ProductItem;
