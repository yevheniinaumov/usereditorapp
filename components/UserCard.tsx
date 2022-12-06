import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getUserIndex, setUserIndex} from "../features/users/userIndexSlice";
import LoadingStatus from "./LoadingStatus";
import * as React from "react";
import UpdateData from "./updateData";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button, CardActionArea, CardActions, Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function UserCard() {
    const dispatch = useAppDispatch();
    const users = UpdateData();
    const userIndex = useAppSelector(getUserIndex) ?? 0;
    const userDataObj = selectUser(userIndex);
    const userData = userDataObj ? Object.entries(userDataObj) : [];

    if (userIndex === null || userIndex === undefined) {
        return <LoadingStatus text='The user has not selected.'/>
    }

    if (!userData) {
        return <LoadingStatus text='No user information found.'/>
    }

    function selectUser(index: number) {
        return Object.values(users)[index]
    }

    const changeUserIndex = (index: number) => {
        if (selectUser(index)) dispatch(setUserIndex(index))
    }

    return <>
        <Card sx={{
            width: '50%',
            maxWidth: 600
        }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        User Card
                    </Typography>
                    {userData.length ?
                        <List>
                            {userData.map((el, index) => {
                                const fieldName = el[0]
                                const fieldValue = el.at(-1)
                                const text = fieldName + ': ' + fieldValue
                                return (
                                    <ListItem key={index} disablePadding>
                                        <ListItemText primary={text}/>
                                    </ListItem>
                                )
                            })}
                        </List>
                        :
                        <Typography variant="h5" component="span">
                            User is not found. Try to go back.
                        </Typography>
                    }
                </CardContent>
            </CardActionArea>
            <CardActions sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Button onClick={() => {
                    changeUserIndex(userIndex - 1)
                }} size="small" color="primary">
                    Prev User
                </Button>
                <Button onClick={() => {
                    changeUserIndex(userIndex + 1)
                }} size="small" color="primary">
                    Next User
                </Button>
            </CardActions>
        </Card>
    </>
}
