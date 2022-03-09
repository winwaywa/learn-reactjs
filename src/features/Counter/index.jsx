import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

CounterFeature.propTypes = {};

function CounterFeature(props) {
    const dispatch = useDispatch();

    const counter = useSelector((state) => state.count);

    const handleIncreaseClick = () => {
        const action = increase();
        console.log(action);
        dispatch(action);
    };
    const handleDecreaseClick = () => {
        const action = decrease();
        // const action = decrease(123); 123 là payload
        console.log(action);
        dispatch(action);
    };

    return (
        <div>
            <h3>{counter}</h3>
            <button className="btn--increase" onClick={() => handleIncreaseClick()}>
                Tăng
            </button>
            <button className="btn--decrease" onClick={() => handleDecreaseClick()}>
                Giảm
            </button>
        </div>
    );
}

export default CounterFeature;
