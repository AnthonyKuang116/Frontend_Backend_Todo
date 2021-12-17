import React, { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


const TodoList = ({todos, setTodos}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();

    let columns = [
        { field: 'from', headerName: 'From', width: 300 },
        { field: 'to', headerName: 'To', width: 150 },
        { field: 'content', headerName: 'Content', width: 200 },
        { field: 'isComplete', headerName: 'Completed', width: 350 },
        { field: 'edit', headerName: 'Edit', width: 105, renderCell: () => (<Button variant="contained" color="primary"  style={{ marginRight: "30px" }}>Edit</Button>) },
        { field: 'delete', headerName: 'Delete', width: 120, renderCell: () => (<Button variant="contained" color="secondary" >Delete</Button>) }
    ]

    return (
        <div className={classes.paper} style={{ height: 650, width: '100%' }}>
            <DataGrid
                className={classes.root}
                rows={todos}
                columns={columns}
                pageSize={10}
                onRowSelected={(row) => setSelection(row.data)}
            />
        </div>
        // <div>
        //     <h2>Todo List</h2>
        // </div>
    )
}

export default TodoList;