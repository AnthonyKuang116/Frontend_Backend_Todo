import * as React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import { updateTodo } from "../api/index"

const EditTodoModal = ({ editTodoModal, setEditTodoModal, todos, setTodos, rowSelection }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();
    const handleClose = () => {
        setEditTodoModal(false)
    }

    const [content, setContent] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [to, setTo] = useState(new Date('2014-08-18T21:11:54')); //need to convert to date to isostring later
    const [from, setFrom] = useState(new Date('2014-08-17T21:11:54')); //need to conver from date to isostring later
    const handleContent = (e) => { setContent(e.target.value) }
    const handleChecked = () => {
        isCompleted === true ? setIsCompleted(false) : setIsCompleted(true);
    }
    const handleToDate = (newValue) => {
        setTo(newValue.toISOString());
    };
    const handleFromDate = (newValue) => {
        setFrom(newValue.toISOString());
    }

    const handleUpdateTodo = async () => {
        try {
            console.log("rowSelection",rowSelection)
            console.log("from", from)
            console.log("to", to)
            console.log("conent", content)
            console.log("complete", isCompleted)
            const newTodo = await updateTodo({ rowSelection, from, to, content, isCompleted })

            const newTodoList = [...todos, newTodo];
            setTodos(newTodoList)
            // setEditTodoModal(false) //closes modal
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal
            className={classes.modal}
            open={editTodoModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={editTodoModal}>
                <div className={classes.paper} style={{ height: 550, width: 300 }}>
                    <form className={classes.root} noValidate autoComplete="off"
                        style={{ height: 500, width: '100%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <h2 style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>Edit Todo</h2>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="From"
                                value={from}
                                onChange={handleFromDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DateTimePicker
                                label="To"
                                value={to}
                                onChange={handleToDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider >
                        <TextField id="addProductSub" label="Content" onChange={handleContent} />
                        <FormControlLabel control={<Checkbox checked={isCompleted} onChange={handleChecked} />} label="Todo Completed" />
                        <Button variant="contained" color="primary" onClick={handleUpdateTodo}>Edit Todo</Button>
                    </form>
                </div>
            </Fade>
        </Modal>
    )
}

export default EditTodoModal;