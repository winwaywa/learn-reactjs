import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, LinearProgress, Paper } from '@mui/material';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import { useRouteMatch } from 'react-router-dom';
import useProductDetail from 'features/Product/hook/useProductDetail';
import ProductInfo from 'features/Product/components/ProductInfo';
import AddToCartForm from 'features/Product/components/AddToCartForm';
import ProductMenu from 'features/Product/components/ProductMenu';
import { Switch, Route } from 'react-router-dom';
import ProductDescription from 'features/Product/components/ProductDescription';
import ProductAdditional from 'features/Product/components/ProductAdditional';
import ProductReview from 'features/Product/components/ProductReview';

DetailsPage.propTypes = {};

function DetailsPage(props) {
    //lấy productId từ params
    const {
        params: { productId },
        url,
    } = useRouteMatch();

    const { product, loading } = useProductDetail(productId);

    if (loading) {
        return (
            <Box className="loading-progress">
                <LinearProgress />
            </Box>
        );
    }

    const handleAddToCartSubmit = (formValues) => {
        console.log(formValues);
    };

    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container className="product">
                        <Grid item className="product__image">
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid item className="product__info">
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartSubmit} />
                        </Grid>
                    </Grid>
                </Paper>
                <ProductMenu />
                <Switch>
                    <Route path={url} exact>
                        <ProductDescription product={product} />
                    </Route>
                    <Route path={`${url}/additional`}>
                        <ProductAdditional product={product} />
                    </Route>
                    <Route path={`${url}/reviews`}>
                        <ProductReview product={product} />
                    </Route>
                </Switch>
            </Container>
        </Box>
    );
}

export default DetailsPage;
