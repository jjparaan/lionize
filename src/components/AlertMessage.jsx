/* eslint-disable no-unused-vars */
import React from "react";
import { Stack, Alert, AlertTitle } from "@mui/material";

const AlertMessage = () => {
	return (
		<>
			<Stack sx={{ width: "100%" }} spacing={2}>
				<Alert variant="outlined" severity="success">
					<AlertTitle>Success</AlertTitle>
					Localization is finished
				</Alert>
			</Stack>
		</>
	);
};

export default AlertMessage;
