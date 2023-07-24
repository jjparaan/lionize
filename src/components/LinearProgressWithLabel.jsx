/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Proptypes from "prop-types";
import { Box, LinearProgress, Typography } from "@mui/material";

const LinearProgressWithLabel = (props) => {
	return (
		<Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1, mb: 1 }}>
				<LinearProgress
					variant="determinate"
					sx={{ height: "25px", borderRadius: "2px" }}
					{...props}
				/>
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
};

export default LinearProgressWithLabel;
