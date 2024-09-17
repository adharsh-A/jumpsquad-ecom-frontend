import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./Orders.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/auth-context.js';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Order() {
    const {userId}=React.useContext(AuthContext)
    const [row,setRow]=React.useState([])
    React.useEffect(() => {
        const OrderDetails=async()=>{
            try{
                let domainName;
            
                if (process.env.NODE_ENV === "production") {
                  domainName = "https://jumpsquad-backend.vercel.app";
                } else {
                  domainName = import.meta.env.VITE_API_URL;
                }
                const response = await axios.get(`${domainName}/api/orders/get-order`,{
                    userId
                },
            );

                setRow(response.data);
                console.log(row);
            }catch(error){
                toast.error(error)
                console.log(error)
            }
        }
        OrderDetails()
    },[]);
    return (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
              <div className="table">
    <TableContainer component={Paper} style={{ maxWidth: 550,display: "inline-block" }}>
      <Table sx={{ minWidth: 550,maxWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>OrderId</TableCell>
            <TableCell align="right">Total Amount</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
      </ThemeProvider>
  );
}
