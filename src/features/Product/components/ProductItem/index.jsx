import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { STATIC_HOST } from 'constants';
import { THUMBNAIL_PLACEHOLDER } from 'constants';
import { useHistory } from 'react-router-dom';

ProductItem.propTypes = {
    product: PropTypes.object,
};

function ProductItem({ product }) {
    const history = useHistory();

    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;

    const handleClick = (productId) => {
        console.log(productId);
        history.push(`/products/${productId}`);
    };
    return (
        <Box className="product-item" padding={1}>
            <Box padding={1} minHeight={200} onClick={() => handleClick(product.id)}>
                <img className="product-item__thumbnail" src={thumbnailUrl} alt={product.name} />
            </Box>
            <Typography
                className="product-item__name"
                variant="body2"
                onClick={() => handleClick(product.id)}
            >
                {product.name}
            </Typography>
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
