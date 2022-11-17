import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Navbar from "components/Navbar";
import Router from "next/router";
import authState from "atoms/authState";
import { useState } from "react";
import { useRecoilState } from "recoil";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';
import { YearPicker } from '@mui/x-date-pickers/YearPicker';

const minDate = dayjs('2020-01-01T00:00:00.000');
const maxDate = dayjs('2034-01-01T00:00:00.000');


export default function Schedule() {
  const [auth, setAuth] = useRecoilState(authState);
  const [date, setDate] = useState(dayjs('2022-11-16'));

  if(auth == null){
    Router.push('/');
  }
  return (
    <>  
      <Grid container spacing={2} height="100vh">
      <Grid item xs={3}>
          <Navbar />
        </Grid>
        <Grid item xs={8} display="flex" borderLeft={1}>
          <Typography variant="h3" component="h1" gutterBottom>
          SchedulePage
            yes
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MonthPicker
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(newDate) => setDate(newDate)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <YearPicker
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(newDate) => setDate(newDate)}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
        </Grid>
      </Grid>
      
    </>
  );
}
