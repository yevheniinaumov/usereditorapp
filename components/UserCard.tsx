import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getUser} from "../features/users/userSlice";
import LoadingStatus from "./LoadingStatus";
import * as React from "react";
import UpdateData from "./updateData";

export default function UserCard() {
    const dispatch = useAppDispatch();
    const users = UpdateData();
    const userID = useAppSelector(getUser);
    const userData = '';
    if (!userID) {
        return <LoadingStatus text='The user has not selected.'/>
    }

    if (!userData) {
        return <LoadingStatus text='No user information found.'/>
    }

    return <>
        <div>User card</div>
    </>
}