/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const State = () => {
	const localStateObj = {
		file: {
			docFile: null,
			termBaseFile: null,
			translationMemoFile: null,
		},

		selectedLanguage: {
			source: null,
			target: null,
		},

		selectedCategory: {
			second: null,
			third: null,
			fourth: null,
		},

		selectedSettings: {
			settings: null,
		},

		selectedGenre: {
			genre: null,
		},

		progress: 0,
		isExpanded: false,
		isLionize: false,
		alert: false,
	};

	const defaultLocalState = { ...localStateObj };
	const [localState, setLocalState] = useState(localStateObj);

	return {
		defaultLocalState,
		localState,
		setLocalState,
	};
};

export default State;
