import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

TodoFeature.propTypes = {};

function TodoFeature(props) {
    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={match.path} component={ListPage} exact />
                <Route path={`${match.path}/details`} component={DetailPage} exact />
            </Switch>
        </div>
    );
}

export default TodoFeature;
