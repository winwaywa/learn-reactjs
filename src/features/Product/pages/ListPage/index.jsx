import './styles.scss';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import queryString from 'query-string';
import productApi from 'api/productApi';
import ProductsSkeletonList from '../../components/ProductsSkeletonList';
import ProductList from 'features/Product/components/ProductList';
import ProductSort from 'features/Product/components/ProductSort';
import ProductFilters from 'features/Product/components/ProductFilters';
import FilterViewer from 'features/Product/components/FilterViewer';
import { useLocation, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

ListPage.propTypes = {};

function ListPage(props) {
    const history = useHistory();
    const location = useLocation();

    //chuyển chuỗi từ url sang object sau mỗi lần url thay đổi
    //Rồi dùng nó thay cho cái filters state trước đó.
    const queryParams = React.useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 12,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        };
    }, [location.search]);

    const [productList, setProductList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    //ko dùng cái state filters nữa(giờ dùng queryParams)
    // const [filters, setFilters] = React.useState({
    //     ...queryParams,
    // });

    const [pagination, setPagination] = React.useState({ page: 1, total: 12, limit: 12 });

    //call api product
    useEffect(() => {
        console.log('listpage:', queryParams);
        (async () => {
            setLoading(true);
            try {
                const { data, pagination } = await productApi.getAll(queryParams);
                console.log({ data, pagination });
                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Fail to fetch product list: ', error);
            }
            setLoading(false);
        })();
    }, [queryParams]);

    //khi filter thay đổi thì update lại url
    // useEffect(() => {
    //     history.push({
    //         pathname: history.location.pathname,
    //         // search: Object.entries(filters)
    //         //     .map((filter) => `${filter[0]}=${filter[1]}`)
    //         //     .join('&'),
    //         search: queryString.stringify(filters),

    //     });
    // }, [history, filters]);

    // khi chuyển trang
    const handlePageChange = (e, page) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _page: page,
        // }));
        const filters = {
            ...queryParams,
            _page: page,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    // sort
    const handleSortChange = (newSortValue) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _sort: newSortValue,
        //     _page: 1, // quay về lại trang 1
        // }));
        const filters = {
            ...queryParams,
            _sort: newSortValue,
            _page: 1, // quay về lại trang 1
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    //filters
    const hanldeFiltersChange = (newFilters) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     ...newFilters,
        //     _page: 1, // quay về lại trang 1
        // }));
        const filters = {
            ...queryParams,
            ...newFilters,
            _page: 1, // quay về lại trang 1
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    // filters view
    const setNewFilters = (newFilters) => {
        // setFilters(newFilters);
        const filters = {
            ...newFilters,
        };
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    return (
        <Box>
            <Container>
                <Grid className="products" container spacing={1}>
                    <Grid className="products__filter" item>
                        <Paper elevation={0}>
                            <ProductFilters filters={queryParams} onChange={hanldeFiltersChange} />
                        </Paper>
                    </Grid>
                    <Grid className="products__list" item>
                        <Paper elevation={0}>
                            {/* sort */}
                            <ProductSort
                                currentSort={queryParams._sort}
                                onChange={handleSortChange}
                            />
                            <FilterViewer
                                filters={queryParams}
                                onChange={setNewFilters}
                            ></FilterViewer>
                            {loading ? (
                                <ProductsSkeletonList length={12} />
                            ) : (
                                <ProductList data={productList} />
                            )}
                            {/* pagination */}
                            <Pagination
                                className="products__page"
                                color="primary"
                                count={Math.ceil(pagination.total / pagination.limit)}
                                page={pagination.page}
                                onChange={handlePageChange}
                            ></Pagination>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
