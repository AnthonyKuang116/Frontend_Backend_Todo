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
// import DateAdapter from '@mui/lab/AdapterLuxon';
import DateAdapter from '@mui/lab/AdapterDateFns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import { addTodo } from "../api/index"




const AddTodoModal = ({ addTodoModal, setAddTodoModal }) => {
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
        setAddTodoModal(false)
    }

    const [content, setContent] = useState("");
    const [checked, setChecked] = useState(false);
    const [isCompleted, setIsCompleted] = useState("Incomplete")
    const [toDate, setToDate] = useState(new Date('2014-08-18T21:11:54')); //need to convert to date to isostring later
    const [fromDate, setFromDate] = useState(new Date('2014-08-17T21:11:54')); //need to conver from date to isostring later
    const handleContent = (e) => { setContent(e.target.value) }
    const handleChecked = () => {
        checked === true ? (setChecked(false), setIsCompleted("Incomplete")) : (setChecked(true), setIsCompleted("Completed"));
    }
    const handleToDate = (newValue) => {
        setToDate(newValue.toISOString());
    };
    const handleFromDate = (newValue) => {
        setFromDate(newValue.toISOString());
    }

    const handleAddTodo = async () => {
        await addTodo({fromDate, toDate, content, isCompleted})
    }

    // const handleCheckToDate = (e) => {
    //     e.preventDefault();
    //     console.log(toDate)
    //     console.log(toDate.toISOString())
    // }

    return (
        <Modal
            className={classes.modal}
            open={addTodoModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={addTodoModal}>
                <div className={classes.paper} style={{ height: 550, width: 300 }}>
                    <form className={classes.root} noValidate autoComplete="off"
                        style={{ height: 500, width: '100%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <h2 style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>Add Todo</h2>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="From"
                                value={fromDate}
                                onChange={handleFromDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DateTimePicker
                                label="To"
                                value={toDate}
                                onChange={handleToDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider >
                        <TextField id="addProductSub" label="Content" onChange={handleContent} />
                        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChecked} />} label="Todo Completed" />
                        <Button variant="contained" color="primary" onClick={handleAddTodo}>Add Todo</Button>
                        {/* <button onClick={handleCheckToDate}>Check To Date</button> */}
                    </form>
                </div>
            </Fade>
        </Modal>
    )
}

export default AddTodoModal;