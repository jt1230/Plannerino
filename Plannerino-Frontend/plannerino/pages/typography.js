import { Typography } from "@mui/material"

export default function TypographyPage(){
	return (
		<>
			<Typography variant="h1">
				h1 Heading
			</Typography>
			<Typography variant="h2">
				h2 Heading
			</Typography>
			<Typography variant="h3">
				h3 Heading
			</Typography>
			<Typography variant="h4">
				h4 Heading
			</Typography>
			<Typography variant="h4" component="h1">
				h4 Heading, but as seen as a h1 component
			</Typography>
			<Typography variant="h5">
				h5 Heading
			</Typography>
			<Typography variant="h6">
				h6 Heading
			</Typography>
			<Typography variant="subtitle1">
				subtitle1 Heading
			</Typography>
			<Typography variant="subtitle2">
				subtitle2 Heading
			</Typography>
			<Typography variant="body1">
				body1 Heading
			</Typography>
			<Typography variant="body2">
				body2 Heading
			</Typography>
		</>
	)
}