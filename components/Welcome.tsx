import {Typography} from "@mui/material";
import Link from 'next/link'
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Welcome() {
    return <>
        <Typography variant="h5" component="p">
            Welcome to the CRUD application.
        </Typography>
        <Typography variant="h6" component="p">
            Go to the Users page to view the list...
        </Typography>

        <Link href="/users">
            <Button variant="contained" endIcon={<NavigateNextIcon/>}>
                Users page
            </Button>
        </Link>
    </>
}
