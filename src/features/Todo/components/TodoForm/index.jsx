import React from 'react';
import PropTypes from 'prop-types';
// import InputField from '../../../../components/form-controls/InputField';
import InputField from 'components/form-controls/InputField';

import { useForm } from 'react-hook-form';

//validate với yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

function TodoForm(props) {
    //validate vs yup
    const schema = yup
        .object()
        .shape({
            title: yup.string().required('Please enter title').min(5, 'Title is too short'),
        })
        .required();

    //useForm
    const form = useForm({
        defaultValues: {
            title: '',
        },

        //validate vs yup
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        const { onSubmit } = props;
        if (onSubmit) onSubmit(values);

        //reset form sau khi submit xong
        form.reset();
    };

    return (
        //do đang ở mode onSubmit nên khi submit mới validate
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="title" label="Todo" form={form} />
        </form>
    );
}

export default TodoForm;
