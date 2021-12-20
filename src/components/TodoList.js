import React, { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getTodo, deleteTodo } from "../api/index";
import { AddTodoModal, EditTodoModal } from "./index";

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
    const [rowSelection, setRowSelection] = useState("");

    useEffect(() => {
        async function fetchTodos() {
            try {
                const data = await getTodo();
                let gridRows = data.result.map((todo) => Object.assign({ id: todo._id, from: todo.from, to: todo.to, content: todo.content, isCompleted: todo.isCompleted, creator: todo.creator }));

                // gridRows.forEach(todo => {
                //     todo.from = todo.from.substring(0,10)
                //     todo.to = todo.to.substring(0,10)
                // })
                
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

    const handleAddTodo = () => {
        setAddTodoModal(true);
    }

    const handleDeleteTodo = () => {
        const newTodos = [...todos].filter(
            (todo) => todo.id != rowSelection[0]
        )

        deleteTodo(rowSelection)
        setTodos(newTodos)
    }

    const handleEditTodo = () => {
        setEditTodoModal(true);
    }

    let columns = [
        // { field: 'from', headerName: 'From', width: 350 },
        {field: 'from', headerName: 'From', width: 350, renderCell: (params) => (params.value.substring(0,10))},
        {field: 'to', headerName: 'To', width: 350, renderCell: (params) => (params.value.substring(0,10))},
        { field: 'content', headerName: 'Content', width: 600 },
        { field: 'isCompleted', headerName: 'Completed', width: 150 },
        { field: 'edit', headerName: 'Edit', width: 105, renderCell: () => (<Button variant="contained" color="primary" onClick={handleEditTodo} style={{ marginRight: "30px" }}>Edit</Button>) },
        { field: 'delete', headerName: 'Delete', width: 120, renderCell: () => (<Button variant="contained" color="secondary" onClick={handleDeleteTodo}>Delete</Button>) }
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
                onSelectionModelChange={(newSelection) => {
                    setRowSelection(newSelection) //grabs todo id
                }}
            />
            {addTodoModal === false ? null : <AddTodoModal {...{addTodoModal, setAddTodoModal, todos, setTodos}}/>}   
            {editTodoModal === false ? null : <EditTodoModal {...{editTodoModal, setEditTodoModal, todos, setTodos, rowSelection}}/>}
        </div>
    )
}

export default TodoList;