import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import { useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {};

function ProductMenu(props) {
    const { url } = useRouteMatch();
    return (
        <Box component="ul" className="product-menu">
            <li>
                <NavLink to={url} exact>
                    Description
                </NavLink>
            </li>
            <li>
                <NavLink to={`${url}/additional`}>Additional information</NavLink>
            </li>
            <li>
                <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
        </Box>
    );
}

export default ProductMenu;
