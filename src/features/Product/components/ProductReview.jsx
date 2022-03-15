import React from 'react';
import PropTypes from 'prop-types';

ProductReview.propTypes = {
    product: PropTypes.func.isRequired,
};

function ProductReview({ product }) {
    return <div>Reviews</div>;
}

export default ProductReview;
