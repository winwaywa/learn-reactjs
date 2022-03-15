import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

ProductDescription.propTypes = {
    product: PropTypes.func.isRequired,
};

function ProductDescription({ product = {} }) {
    // sanitize html trước để cho an toàn tránh lỗi XSS
    const safeDescription = DOMPurify.sanitize(product.description);

    // thuộc tính dangerouslySetInnerHTML của React
    return <div dangerouslySetInnerHTML={{ __html: safeDescription }} />;
}

export default ProductDescription;
