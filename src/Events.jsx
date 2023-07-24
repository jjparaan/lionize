/* eslint-disable no-unused-vars */
import React from "react";

const Events = (state) => {
	const { defaultLocalState, localState, setLocalState } = state;

	const events = {
		doCalculateETA: () => {
			const totalProgressIncrements = 100 / 10; // 10 increments from 0 to 100 (10%, 20%, ..., 100%)
			const totalTimeInMinutes = (totalProgressIncrements * 0.8) / 60; // 0.8 seconds for each increment, converted to minutes
			const remainingProgress = 100 - localState.progress;
			const remainingTimeInMinutes = (remainingProgress * 0.8) / 60; // Remaining time for the remaining progress, converted to minutes

			if (remainingTimeInMinutes < 60) {
				return `${remainingTimeInMinutes.toFixed(1)} minutes`;
			} else {
				const hours = Math.floor(remainingTimeInMinutes / 60);
				const minutes = Math.round(remainingTimeInMinutes % 60);
				if (hours === 1) {
					return `${hours} hour and ${minutes} minutes`;
				} else {
					return `${hours} hours and ${minutes} minutes`;
				}
			}
		},

		doImportFile: (event) => {
			const name = event.target.name;
			const file = event.target.files[0];

			if (file) {
				setLocalState((prevState) => ({
					...prevState,
					file: {
						...prevState.file,
						[name]: file,
					},
				}));
			}
		},

		doExpandAddtlSettings: () => {
			setLocalState((prevState) => ({
				...prevState,
				isExpanded: !prevState.isExpanded,
			}));
		},

		doLionize: () => {
			console.log("lionizing");
			setLocalState((prevState) => ({
				...prevState,
				progress: 0,
				isExpanded: false,
				isLionize: true,
			}));
		},

		doLanguageChange: (event, value, name) => {
			setLocalState((prevState) => ({
				...prevState,
				selectedLanguage: {
					...prevState.selectedLanguage,
					[name]: value,
				},
			}));
		},

		doCategoryChange: (event, value, name) => {
			setLocalState((prevState) => ({
				...prevState,
				selectedCategory: {
					...prevState.selectedCategory,
					[name]: value,
				},
			}));
		},

		doGameSettingChange: (event, value, name) => {
			setLocalState((prevState) => ({
				...prevState,
				selectedSettings: {
					...prevState.selectedSettings,
					[name]: value,
				},
			}));
		},

		doGameGenreChange: (event, value, name) => {
			setLocalState((prevState) => ({
				...prevState,
				selectedGenre: {
					...prevState.selectedGenre,
					[name]: value,
				},
			}));
		},
	};

	return { events };
};

export default Events;
