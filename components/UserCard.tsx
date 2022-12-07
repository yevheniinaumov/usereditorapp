import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getUser, setUser} from "../features/users/userSlice";
import LoadingStatus from "./LoadingStatus";
import * as React from "react";
import UpdateData from "./updateData";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button, CardActionArea, CardActions, Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {useState} from "react";

export default function UserCard() {
    const dispatch = useAppDispatch();
    const users = UpdateData();
    const usersData = Object.values(users)
    const userID = useAppSelector(getUser);
    const user = usersData.filter((item) => {
        return item.id === userID
    }).at(-1);
    const [userIndex, setUserIndex] = useState(usersData.indexOf(user))
    const userData = user ? Object.entries(user) : []

    if (!userID) {
        return <LoadingStatus text='The user has not selected.'/>
    }

    if (!userData) {
        return <LoadingStatus text='No user information found.'/>
    }

    const changeUser = (index: number) => {
        if (index < 0 || index >= usersData.length) {
            setUserIndex(0)
            dispatch(setUser(usersData[0].id ))
        } else {
            setUserIndex(index)
            dispatch(setUser(usersData[index].id ))
        }
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
                    changeUser(userIndex-1)
                }} size="small" color="primary">
                    Prev User
                </Button>
                <Button onClick={() => {
                    changeUser(userIndex+1)
                }} size="small" color="primary">
                    Next User
                </Button>
            </CardActions>
        </Card>
    </>
}
