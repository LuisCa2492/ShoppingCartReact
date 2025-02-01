import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addToCart, addToCartLS } from '../../store/ShoppingCartSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const ShoppingCart = () => {
  const cart = useSelector((state) => state.shopCart.cart);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false); // Evitar recarga innecesaria

  useEffect(() => {
    if (!loaded) {
      try {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

        // 🔹 Fusionar `cart` con `savedCart` y eliminar duplicados
        const mergedCart = [...cart, ...savedCart].reduce((acc, item) => {
          if (!acc.some((cartItem) => cartItem.name === item.name)) {
            acc.push(item);
          }
          return acc;
        }, []);

        // 🔹 Solo actualizar Redux si hay cambios
        if (mergedCart.length !== cart.length) {
          dispatch(addToCartLS(mergedCart)); // ⬅️ Llamar `addToCart` solo una vez con el array completo
        }

        setLoaded(true); // 🔹 Evita múltiples ejecuciones
      } catch (error) {
        console.error("Error al cargar localStorage:", error);
      }
    }
  }, [loaded]); // Se ejecuta solo al montar el componente

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <img src={row.image} alt={row.name} style={{ width: 50, height: 50, borderRadius: "50%" }} />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
