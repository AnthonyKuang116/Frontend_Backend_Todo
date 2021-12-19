import React, { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getTodo, deleteTodo } from "../api/index";
import { AddTodoModal } from "./index";

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TodoList = () => {
    const useStyles = makeStyles((theme) => ({
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const [todos, setTodos] = useState([]);
    const [addTodoModal, setAddTodoModal] = useState(false);
    const [editTodoModal, setEditTodoModal] = useState(false);
    const [rowSelection, setRowSelection] = useState(0);


    // let gridRows = [{ id: 1, from: 1111, to: 2222, content: "testing", isCompleted: "false" }];
    useEffect(() => {
        async function fetchTodos() {
            try {
                const data = await getTodo();
                // setTodos(data);
                let gridRows = data.result.map((todo) => Object.assign({ id: todo._id, from: todo.from, to: todo.to, content: todo.content, isCompleted: todo.isCompleted }));
                setTodos(gridRows)
                console.log("gridRows", gridRows)
            } catch (error) {
                console.error(error);
            }
        }
        fetchTodos();
    }, [])

    useEffect(() => {

    }, [todos])

    const classes = useStyles();

    const handleTodos = () => {
        // const gridRows = todos.result.map((todo) => Object.assign({ from: todo.from, to: todo.to, content: todo.content, isCompleted: todo.isCompleted }));
        // console.log(gridRows);

        console.log(todos)
    }

    const handleAddTodo = () => {
        setAddTodoModal(true);
    }

    const handleDeleteTodo = () => {
        const newTodos = [...todos].filter(
            (todo) => todo.id != rowSelection.id
        )

        deleteTodo(rowSelection.id)
        setTodos(newTodos)
    }
    const handleTest = () => {
        console.log(rowSelection)
    }

    let columns = [
        { field: 'from', headerName: 'From', width: 350 },
        { field: 'to', headerName: 'To', width: 350 },
        { field: 'content', headerName: 'Content', width: 600 },
        { field: 'isCompleted', headerName: 'Completed', width: 150 },
        { field: 'edit', headerName: 'Edit', width: 105, renderCell: () => (<Button variant="contained" color="primary" style={{ marginRight: "30px" }}>Edit</Button>) },
        { field: 'delete', headerName: 'Delete', width: 120, renderCell: () => (<Button variant="contained" color="secondary" onClick={handleTest}>Delete</Button>) }
    ]

    return (
        <div className={classes.paper, "todo-grid-container"} style={{ height: "90vh", width: '100%' }}>
            <div className="add-todo-button-container">
                <Button variant="contained" color="primary" onClick={handleAddTodo}>Add Todo</Button>
            </div>


            <DataGrid
                className={classes.root}
                rows={todos}
                columns={columns}
                pageSize={15}
                // getRowId={row => setRowSelection(row.id)}
                // onRowSelected={(row) => {setRowSelection(row.data)}
            />
            {addTodoModal === false ? null : <AddTodoModal {...{addTodoModal, setAddTodoModal}}/>}   
            {editTodoModal === false ? null : <div class="edit-todo-modal"></div>}
            <button onClick={handleTodos}>Check todos</button>
        </div>
    )
}

export default TodoList;