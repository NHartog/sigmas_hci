"use client"

import { withdrawApplication } from "@/actions/application"
import { Button } from "@mui/material"

export default function WithdrawButton() {
	return (
		<Button onClick={() => withdrawApplication()} variant="outlined" color="error" >Withdraw Application</Button>
	)
}
