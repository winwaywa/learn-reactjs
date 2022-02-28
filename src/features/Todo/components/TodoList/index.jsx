import classnames from "classnames";
import "./styles.scss";

import React from "react";
import PropTypes from "prop-types";

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func,
};
TodoList.default = {
    todoList: [],
    onTodoClick: null
};

function TodoList({ todoList, onTodoClick }) {
    const handleTodoClick = (todo, idx) => {
        if (!onTodoClick) return;
        else
            onTodoClick(todo, idx);
    }
    return (
        <ul className="todo-list">
            {todoList.map((todo, idx) => (
                <li
                    key={todo.id}
                    className={classnames({
                        "todo-item": true,
                        completed: todo.status === "completed",
                    })}
                    onClick={() => handleTodoClick(todo, idx)}
                >
                    {todo.title}
                </li>
            ))
            }
        </ul >
    );
}

export default TodoList;
