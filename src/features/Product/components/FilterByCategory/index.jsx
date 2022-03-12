import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import categoryApi from 'api/categoryApi';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
    const [categoryList, setCategoryList] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            try {
                const categories = await categoryApi.getAll();
                console.log(categories);
                setCategoryList(categories);
            } catch (error) {
                console.log('Fail to fetch category list:', error);
            }
        })();
    }, []);

    const handleCategoryClick = (id) => {
        if (onChange) onChange(id);
    };

    return (
        <Box>
            <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
            <ul className="category">
                {categoryList.map((category) => (
                    <li
                        className="category__item"
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        <Typography variant="body2">{category.name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;
