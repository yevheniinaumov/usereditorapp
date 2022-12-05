import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Typography from "@mui/material/Typography";
import { globals } from '../globals';

export default function Footer() {
    return <>
        <Box component='footer' sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            alignContent: 'center',
            padding: '10px 20px'
        }}>
            <Link sx={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
            }}
                  target="_blank"
                  underline="none"
                  href={globals.linkedinLink}
                  rel="noopener noreferrer">
                <LinkedInIcon/>
                <Typography variant="h6" component="span">
                    {`© ${globals.yourName} ${new Date().getFullYear()}`}
                </Typography>
            </Link>
        </Box>
    </>
}