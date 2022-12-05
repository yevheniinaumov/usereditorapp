import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import * as React from "react";
import Link from 'next/link'

export default function Menu(props: { open: any; }) {
    const open = props.open
    return <>
        <List>
            {['home', 'users', 'user'].map((title, index) => {
                const href = index > 0 ? '/' + title : '/';
                const icon = index === 0 ? <HomeIcon/> : index % 2 === 0 ? <PersonIcon/> : <GroupIcon/>
                return (
                    <Link key={index} href={'/' + href}>
                        <ListItem disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={title} sx={{
                                    opacity: open ? 1 : 0,
                                    textTransform: 'capitalize'
                                }}/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                )
            })}
        </List>
    </>
}
