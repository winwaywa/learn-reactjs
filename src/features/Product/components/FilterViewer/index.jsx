import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Stack } from '@mui/material';
import categoryApi from 'api/categoryApi';

FilterViewer.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

//các loại filter
const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Miễn phí ship',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: (filters) => {
            const newFilters = { ...filters };
            //có isFreeShip thì xoá , ko thì thêm
            if (newFilters.isFreeShip) delete newFilters.isFreeShip;
            else newFilters.isFreeShip = true;
            return { ...newFilters, _page: 1 };
        },
    },
    {
        id: 2,
        getLabel: (filters) => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            if (newFilters.isPromotion) delete newFilters.isPromotion;
            return { ...newFilters, _page: 1 };
        },
        ontoggle: () => {},
    },
    {
        id: 3,
        getLabel: (filters) =>
            `Khoảng giá từ ${new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'VND',
            }).format(filters.salePrice_gte)} đến ${new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'VND',
            }).format(filters.salePrice_lte)}`,
        isActive: () => true,
        isVisible: (filters) =>
            Object.keys(filters).includes('salePrice_lte') &&
            Object.keys(filters).includes('salePrice_gte'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            if (
                Object.keys(newFilters).includes('salePrice_lte') &&
                Object.keys(newFilters).includes('salePrice_lte')
            ) {
                delete newFilters.salePrice_gte;
                delete newFilters.salePrice_lte;
            }
            return { ...newFilters, _page: 1 };
        },
        ontoggle: () => {},
    },
    {
        id: 4,
        getLabel: (filters, categoryName) => {
            return categoryName;
        },
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes('category.id'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            if (Object.keys(newFilters).includes('category.id')) delete newFilters['category.id'];
            return { ...newFilters, _page: 1 };
        },
        ontoggle: () => {},
    },
];

//gán luôn thay cho defaultProp cũng dc
function FilterViewer({ filters = {}, onChange = null }) {
    const [categoryName, setCategoryName] = React.useState('');

    // chỉ tính lại khúc này khi filters thay đổi
    const visibleFilters = React.useMemo(() => {
        return FILTER_LIST.filter((x) => x.isVisible(filters));
    }, [filters]);

    React.useEffect(() => {
        //call api và set category name tương ứng vs id
        setCategoryName('');
        if (filters['category.id']) {
            (async () => {
                try {
                    const categoryId = filters['category.id'];
                    const category = await categoryApi.get(categoryId);
                    setCategoryName(category.name);
                } catch (error) {
                    console.log('Failt to fetch category by id:', error);
                }
            })();
        }
    }, [filters['category.id']]);

    return (
        <Box padding={1} component="ul">
            <Stack direction="row" spacing={1}>
                {visibleFilters.map((x) => (
                    <li key={x.id}>
                        <Chip
                            label={x.getLabel(filters, categoryName)}
                            color={x.isActive(filters) ? 'primary' : 'default'}
                            clickable={!x.isRemovable}
                            onClick={
                                x.isRemovable
                                    ? null
                                    : () => {
                                          if (onChange) onChange(x.onToggle(filters));
                                      }
                            }
                            onDelete={
                                x.isRemovable
                                    ? () => {
                                          if (onChange) onChange(x.onRemove(filters));
                                      }
                                    : null
                            }
                        />
                    </li>
                ))}
            </Stack>
        </Box>
    );
}

export default FilterViewer;
