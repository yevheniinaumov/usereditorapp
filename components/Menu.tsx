import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import * as React from "react";
import Link from 'next/link'

export default function Menu(props: { open: any; }) {
    const open = props.open
    return <>
        <List>
            <Link key='0' href="/">
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
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Home' sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
    </>
}
