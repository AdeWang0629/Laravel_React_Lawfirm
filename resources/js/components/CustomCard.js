import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Theme = createTheme({
    typography: {
      fontSize: 10,
    },
});

export const CustomCard = ({bg_l_color, bg_r_color, h_text, c_text}) => {
    return (
        <ThemeProvider theme={Theme}>
            <Card sx={{backgroundImage: `linear-gradient(to left, ${bg_l_color}, ${bg_r_color}) !important`, height: 80}} className='pl-3 pt-3 pr-3 pb-2 pt-0'>
                <Stack>
                    <Typography variant='h6' className='text-white'>{h_text}</Typography>
                    <Typography variant='h4' className='text-white weight-7'>{c_text}</Typography>
                </Stack>
            </Card>
        </ThemeProvider>
    )
}