import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
                const response = await axios.get(`${domainName}/api/orders/get-order`, {
                  params: { userId: userId }  // Query parameter
              });

                setRow(response.data);
                
            }catch(error){
                toast.error(error)
                console.log(error)
            }
        }
        OrderDetails()
    },[]);

    const handleOrder=(rowId)=>{
        navigate(`/order/${rowId}`)
    }
    return (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
              <div className="table">

    <TableContainer component={Paper} style={{ maxWidth: 750,display: "inline-block" }}>
      <Table sx={{ minWidth: 350,maxWidth: 750 }} aria-label="simple table">
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
              key={row.orderId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },cursor:"pointer" }}
              onClick={()=>handleOrder(row.orderId)}
            >
              <TableCell component="th" scope="row" >
                {row.orderId }
              </TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{new Date(row.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
      </ThemeProvider>
  );
}
