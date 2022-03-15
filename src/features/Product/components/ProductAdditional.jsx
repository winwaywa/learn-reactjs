import React from 'react';
import PropTypes from 'prop-types';

ProductAdditional.propTypes = {
    product: PropTypes.func.isRequired,
};

function ProductAdditional({ product }) {
    return <div>Thông tin thêm</div>;
}

export default ProductAdditional;
