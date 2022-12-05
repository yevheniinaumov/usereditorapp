import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {dataAsync, getUsers} from "../features/users/usersSlice";
import {isEmpty} from "./helpers";

export default function UpdateData () {
    const apiData = useAppSelector(getUsers);
    const dispatch = useAppDispatch();

    const update = () => dispatch(dataAsync())

    useEffect(() => {
        if (isEmpty(apiData)) update()
    }, [dispatch])

    if (!isEmpty(apiData)) {
        return apiData
    } else {
        return false
    }
}
