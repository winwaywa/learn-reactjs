import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './components/TodoList';
import queryString from 'query-string';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';

TodoFeature.propTypes = {};

function TodoFeature(props) {
    const initTodoList = [
        { id: 1, title: 'Eat', status: 'new' },
        { id: 2, title: 'Sleep', status: 'completed' },
        { id: 3, title: 'Code', status: 'new' },
    ];

    const location = useLocation();
    // const history = useHistory();
    // const match = useRouteMatch();

    const [todoList, setTodoList] = React.useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = React.useState(() => {
        const params = queryString.parse(location.search);
        return params.status || 'all';
    });

    const handleTodoClick = (todo, idx) => {
        //clone current array to the new one
        const newTodoList = [...todoList];

        //toggle state
        newTodoList[idx] = {
            ...newTodoList[idx],
            status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
        };

        //update todo list
        setTodoList(newTodoList);
    };

    const handleShowAllClick = () => {
        setFilteredStatus('all');
        // const queryParams = { status: "all" };
        // history.push({
        //     pathname: match.path,
        //     search: queryString.stringify(queryParams)
        // })
    };
    const handleShowCompletedClick = () => {
        setFilteredStatus('completed');
    };
    const handleShowNewsClick = () => {
        setFilteredStatus('new');
    };

    const renderedTodoList = todoList.filter((todo) => filteredStatus === 'all' || todo.status === filteredStatus);

    return (
        <div>
            <h3>Todo List</h3>
            <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
            <div>
                <button onClick={handleShowAllClick}>All</button>
                <button onClick={handleShowCompletedClick}>Completed</button>
                <button onClick={handleShowNewsClick}>New</button>
            </div>
        </div>
    );
}

export default TodoFeature;
