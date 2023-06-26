import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import GuestLayout from "./guestLayout"
import Navigation from './Navigation'
import SignIn from '@/pages/signin'
import { Box } from '@mui/system'
import { Paper } from '@mui/material'

const layout = (props) => {
    const { data: session } = useSession()
    if (session != null) {
        return (
            <Box>
                <Paper sx={{ bgcolor: "#f8f8f8", height: "100vh", overflowY: 'scroll' }}>
                    <Navigation />
                    {props.children}
                </Paper>
            </Box>
        )
    } else {
        return (
            <GuestLayout>
                <Paper sx={{ bgcolor: "#f8f8f8", height: "100vh" }}>
                    <Navigation />
                    <SignIn />
                </Paper>
            </GuestLayout>
        )
    }

}

export default layout