/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import AlertMessage from "./AlertMessage";
import { styled } from "@mui/material/styles";
import {
	Grid,
	Box,
	Card,
	CardHeader,
	CardContent,
	Button,
	Autocomplete,
	TextField,
	CardActions,
	IconButton,
	Collapse,
	Typography,
} from "@mui/material";
import {
	PublishTwoTone,
	CheckCircleOutline,
	SettingsOutlined,
	ExpandMoreOutlined,
} from "@mui/icons-material";

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

const languageOptions = [
	{ label: "English" },
	{ label: "Filipino" },
	{ label: "Korean" },
	{ label: "Japanese" },
	{ label: "Spanish" },
	{ label: "Mandarin Chinese" },
	{ label: "Hindi" },
	{ label: "Arabic" },
	{ label: "French" },
	{ label: "German" },
	{ label: "Dutch" },
];

const categoryOptions = [
	{ label: "Id" },
	{ label: "Category" },
	{ label: "Tags" },
	{ label: "Label" },
	{ label: "Author" },
	{ label: "Publication Date" },
	{ label: "Language" },
	{ label: "Country" },
	{ label: "Genre" },
	{ label: "Length" },
	{ label: "Rating" },
	{ label: "Price" },
	{ label: "Availability" },
	{ label: "Format" },
];

const gameOptions = [
	{ label: "Fantasy" },
	{ label: "Medieval" },
	{ label: "RPG" },
	{ label: "Simulation" },
	{ label: "Strategy" },
	{ label: "Puzzle" },
	{ label: "Survival" },
	{ label: "Stealth" },
];

const gameGenre = [
	{ label: "Sci-Fi" },
	{ label: "Adventure" },
	{ label: "Horror" },
	{ label: "Action" },
	{ label: "Sports" },
	{ label: "Platformer" },
	{ label: "Mystery" },
];

const Form = ({
	defaultLocalState,
	localState,
	setLocalState,
	doCalculateETA,
	doImportFile,
	doExpandAddtlSettings,
	doLionize,
	doLanguageChange,
	doCategoryChange,
	doGameSettingChange,
	doGameGenreChange,
}) => {
	useEffect(() => {
		let timer;
		if (localState.isLionize && localState.progress < 100) {
			timer = setInterval(() => {
				setLocalState((prevState) => ({
					...prevState,
					progress:
						prevState.progress >= 100
							? 100
							: Math.min(prevState.progress + 0.5, 100),
				}));
			}, 800);
		}
		return () => {
			clearInterval(timer);
		};
	}, [localState.isLionize, localState.progress]);

	useEffect(() => {
		if (localState.progress >= 100) {
			setLocalState((prevState) => ({
				...prevState,
				alert: true,
			}));
			const timeout = setTimeout(() => {
				setLocalState(defaultLocalState);
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [localState.progress]);
	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			sx={{ height: "100vh" }}
		>
			<Grid item>
				{localState.alert && <AlertMessage />}
				<Card sx={{ maxWidth: 600 }}>
					<CardHeader
						title="L10nize!"
						subheader="Upload your document as a spreadsheet. The first column should include the text to be translated. If you have additional information about the text, please use the menu below."
					/>

					<CardContent>
						<Grid container flexDirection="column" gap="20px">
							<Grid item xs={12}>
								<Button
									fullWidth
									variant="outlined"
									color="primary"
									startIcon={<PublishTwoTone />}
									component="label"
									disabled={localState.isLionize ? true : false}
								>
									{localState.file.docFile
										? localState.file.docFile.name
										: "Import"}
									<input
										type="file"
										id="docFile"
										name="docFile"
										hidden
										onChange={doImportFile}
									/>
								</Button>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Autocomplete
										disablePortal
										options={languageOptions}
										getOptionLabel={(option) => option.label}
										value={localState.selectedLanguage.source}
										onChange={(event, value) =>
											doLanguageChange(event, value, "source")
										}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Source language"
												id="source"
												name="source"
											/>
										)}
										disabled={localState.isLionize ? true : false}
										sx={{ width: "100%" }}
									/>
								</Grid>
								<Grid item xs={6}>
									<Autocomplete
										disablePortal
										options={languageOptions}
										getOptionLabel={(option) => option.label}
										value={localState.selectedLanguage.target}
										onChange={(event, value) =>
											doLanguageChange(event, value, "target")
										}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Target language"
												id="target"
												name="target"
											/>
										)}
										disabled={localState.isLionize ? true : false}
										sx={{ width: "100%" }}
									/>
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={12} sx={{ display: "flex" }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginRight: 2,
											flex: "1",
										}}
									>
										<CheckCircleOutline sx={{ marginRight: 1 }} />
										Second column
									</Box>
									<Autocomplete
										disablePortal
										options={categoryOptions}
										getOptionLabel={(option) => option.label}
										value={localState.selectedCategory.second}
										onChange={(event, value) =>
											doCategoryChange(event, value, "second")
										}
										renderInput={(params) => (
											<TextField {...params} label="Select column category" />
										)}
										disabled={localState.isLionize ? true : false}
										sx={{ flex: "2" }}
									/>
								</Grid>
								<Grid item xs={12} sx={{ display: "flex" }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginRight: 2,
											flex: "1",
										}}
									>
										<CheckCircleOutline sx={{ marginRight: 1 }} />
										Third column
									</Box>
									<Autocomplete
										disablePortal
										options={categoryOptions}
										getOptionLabel={(option) => option.label}
										value={localState.selectedCategory.third}
										onChange={(event, value) =>
											doCategoryChange(event, value, "third")
										}
										renderInput={(params) => (
											<TextField {...params} label="Select column category" />
										)}
										disabled={localState.isLionize ? true : false}
										sx={{ flex: "2" }}
									/>
								</Grid>
								<Grid item xs={12} sx={{ display: "flex" }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginRight: 2,
											flex: "1",
										}}
									>
										<CheckCircleOutline sx={{ marginRight: 1 }} />
										Fourth column
									</Box>
									<Autocomplete
										disablePortal
										options={categoryOptions}
										getOptionLabel={(option) => option.label}
										value={localState.selectedCategory.fourth}
										onChange={(event, value) =>
											doCategoryChange(event, value, "fourth")
										}
										renderInput={(params) => (
											<TextField {...params} label="Select column category" />
										)}
										disabled={localState.isLionize ? true : false}
										sx={{ flex: "2" }}
									/>
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Autocomplete
										disablePortal
										options={gameOptions}
										getOptionLabel={(option) => option.label}
										value={localState.selectedSettings.settings}
										onChange={(event, value) =>
											doGameSettingChange(event, value, "settings")
										}
										renderInput={(params) => (
											<TextField {...params} label="Select game setting" />
										)}
										disabled={localState.isLionize ? true : false}
										sx={{ width: "100%" }}
									/>
								</Grid>
								<Grid item xs={6}>
									<Autocomplete
										disablePortal
										options={gameGenre}
										getOptionLabel={(option) => option.label}
										value={localState.selectedGenre.genre}
										onChange={(event, value) =>
											doGameGenreChange(event, value, "genre")
										}
										renderInput={(params) => (
											<TextField {...params} label="Select game genre" />
										)}
										disabled={localState.isLionize ? true : false}
										sx={{ width: "100%" }}
									/>
								</Grid>
							</Grid>
						</Grid>
					</CardContent>

					<CardActions disableSpacing>
						<IconButton aria-label="additional options">
							<SettingsOutlined />
						</IconButton>
						<ExpandMore
							expand={localState.isExpanded}
							onClick={doExpandAddtlSettings}
							aria-expanded={localState.isExpanded}
							aria-label="show more"
						>
							<ExpandMoreOutlined />
						</ExpandMore>
					</CardActions>

					<Collapse in={localState.isExpanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Grid container spacing={2}>
								<Grid item xs={12} sx={{ display: "flex" }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginRight: 2,
											flex: "1",
										}}
									>
										<CheckCircleOutline sx={{ marginRight: 1 }} />
										GPT Proofreading & revision
									</Box>
								</Grid>
								<Grid item xs={12} sx={{ display: "flex" }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginRight: 2,
											flex: "1",
										}}
									>
										<CheckCircleOutline sx={{ marginRight: 1 }} />
										Linguist Proofreading & Revision
									</Box>
								</Grid>

								<Grid item xs={12} sx={{ display: "flex" }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginRight: 2,
											flex: "1",
										}}
									>
										<CheckCircleOutline sx={{ marginRight: 1 }} />
										Term base
									</Box>
									<Button
										variant="outlined"
										color="primary"
										startIcon={<PublishTwoTone />}
										component="label"
										disabled={localState.isLionize ? true : false}
										sx={{ flex: "2" }}
									>
										{localState.file.termBaseFile
											? localState.file.termBaseFile.name
											: "Import"}
										<input
											type="file"
											id="termBaseFile"
											name="termBaseFile"
											hidden
											onChange={doImportFile}
										/>
									</Button>
								</Grid>
								<Grid item xs={12} sx={{ display: "flex" }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginRight: 2,
											flex: "1",
										}}
									>
										<CheckCircleOutline sx={{ marginRight: 1 }} />
										Translation memory
									</Box>
									<Button
										variant="outlined"
										color="primary"
										startIcon={<PublishTwoTone />}
										component="label"
										disabled={localState.isLionize ? true : false}
										sx={{ flex: "2" }}
									>
										{localState.file.translationMemoFile
											? localState.file.translationMemoFile.name
											: "Import"}
										<input
											type="file"
											id="translationMemoFile"
											name="translationMemoFile"
											hidden
											onChange={doImportFile}
										/>
									</Button>
								</Grid>
							</Grid>
						</CardContent>
					</Collapse>

					<CardActions
						disableSpacing
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Button
							variant="outlined"
							sx={{ width: "100%" }}
							onClick={doLionize}
						>
							L10NIZE!
						</Button>
					</CardActions>

					<CardActions disableSpacing>
						{localState.isLionize && localState.progress !== 100 && (
							<>
								<CardContent sx={{ width: "100%" }}>
									<LinearProgressWithLabel value={localState.progress} />
									<Typography variant="body2" color="text.secondary">
										Your localization will be finished in {doCalculateETA()}.
										You can close this window for now and you will be notified
										when the localization is finalized.
									</Typography>
								</CardContent>
							</>
						)}
					</CardActions>
				</Card>
			</Grid>
		</Grid>
	);
};

export default Form;
