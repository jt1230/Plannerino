import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#F8EDE3",
	  main: "#815B5B",
	  darker: "#483434"
    },
	button:{
		main: "#483434",
	}
  },
  typography: {
	h1:{
		fontSize: "48px",
	},
	body1:{
		fontSize: "20px",
	},
    subtitle1: {
      fontSize: "16px",
    },
	subtitle2:{
		fontSize: "14px",
	},
    button: {
      textTransform: "none",
    },
  },
 
});
export default theme;
