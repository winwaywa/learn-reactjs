import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import ListPage from './pages/ListPage';
import DetailsPage from './pages/DetailsPage';
import NotFound from 'components/NotFound';
import { Box } from '@mui/material';

ProductFeature.propTypes = {};

function ProductFeature(props) {
    const match = useRouteMatch();

    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} component={ListPage} exact />
                <Route path={`${match.url}/:productId`} component={DetailsPage} />
            </Switch>
        </Box>
    );
}

export default ProductFeature;
