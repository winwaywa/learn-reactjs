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

ListPage.propTypes = {};

function ListPage(props) {
    const history = useHistory();
    const location = useLocation();
    const queryParams = queryString.parse(location.search); //chuyển chuỗi từ url sang object để set filter default

    const [productList, setProductList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filters, setFilters] = React.useState({
        ...queryParams,
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 12,
        _sort: queryParams._sort || 'salePrice:ASC',
    });
    const [pagination, setPagination] = React.useState({ page: 1, total: 12, limit: 12 });

    //call api product
    useEffect(() => {
        console.log('listpage:', filters);
        (async () => {
            setLoading(true);
            try {
                const { data, pagination } = await productApi.getAll(filters);
                console.log({ data, pagination });
                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Fail to fetch product list: ', error);
            }
            setLoading(false);
        })();
    }, [filters]);

    //khi filter thay đổi thì update lại url
    useEffect(() => {
        history.push({
            pathname: history.location.pathname, // dùng  history.location.pathname thay cho location.pathname vì thằng location nó thay đổi còn thằng history nó chỉ thay đổi location chứ ko thay đổi history
            // search: Object.entries(filters)
            //     .map((filter) => `${filter[0]}=${filter[1]}`)
            //     .join('&'),
            search: queryString.stringify(filters), //queryString giúp làm thay cái trên
        });
    }, [history, filters]);

    // khi chuyển trang
    const handlePageChange = (e, page) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page,
        }));
    };

    // sort
    const handleSortChange = (newSortValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _sort: newSortValue,
            _page: 1, // quay về lại trang 1
        }));
    };

    //filters
    const hanldeFiltersChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
            _page: 1, // quay về lại trang 1
        }));
    };

    // filters view
    const setNewFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <Box>
            <Container>
                <Grid className="products" container spacing={1}>
                    <Grid className="products__filter" item>
                        <Paper elevation={0}>
                            <ProductFilters filters={filters} onChange={hanldeFiltersChange} />
                        </Paper>
                    </Grid>
                    <Grid className="products__list" item>
                        <Paper elevation={0}>
                            {/* sort */}
                            <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
                            <FilterViewer filters={filters} onChange={setNewFilters}></FilterViewer>
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
