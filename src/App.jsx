/* eslint-disable no-unused-vars */
import React from "react";
import State from "./State";
import Events from "./Events";
import Form from "./components/Form";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
	const state = State();
	const events = Events(state);

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Form
				defaultLocalState={state.defaultLocalState}
				localState={state.localState}
				setLocalState={state.setLocalState}
				doCalculateETA={events.events.doCalculateETA}
				doImportFile={events.events.doImportFile}
				doExpandAddtlSettings={events.events.doExpandAddtlSettings}
				doLionize={events.events.doLionize}
				doLanguageChange={events.events.doLanguageChange}
				doCategoryChange={events.events.doCategoryChange}
				doGameSettingChange={events.events.doGameSettingChange}
				doGameGenreChange={events.events.doGameGenreChange}
			/>
		</ThemeProvider>
	);
};

export default App;
