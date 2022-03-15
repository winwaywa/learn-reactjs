import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, LinearProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import QuantityField from 'components/form-controls/QuantityField';

//validate với yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
    // validate vs yup
    const schema = yup.object().shape({
        quantity: yup.number().min(1, 'Nhập ít nhất 1').typeError('Please enter a number'),
    });

    //useForm
    const form = useForm({
        defaultValues: {
            quantity: 1,
        },

        //validate vs yup
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        if (onSubmit) await onSubmit(values);

        //reset form sau khi submit xong
        form.reset();
    };

    //xem có đang submit ko
    const { isSubmitting } = form.formState;

    return (
        <Box>
            {isSubmitting && <LinearProgress />}
            {/* do đang ở mode onSubmit nên khi submit mới validate */}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <QuantityField name="quantity" label="quantity" form={form} />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    width="200px"
                >
                    Add to cart
                </Button>
            </form>
        </Box>
    );
}

export default AddToCartForm;
