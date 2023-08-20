import { Typography } from "@mui/material";

export const username_item = (data) => {
    return data.map((item, value) => (
        <Typography key={value} color="#e8b210">{item.name}</Typography>
    ));
}

export const formate_date = (date) => {
    const dirtyDate = new Date(date);
    const formattedDate = dirtyDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return formattedDate;
}