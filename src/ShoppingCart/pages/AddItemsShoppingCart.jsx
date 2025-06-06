import React, { useEffect, useState } from 'react';
import { CardApp } from '../components/CardApp';
import { useDispatch, useSelector } from 'react-redux';
import { getCards,getCardsByPagination } from '../../store/thunks';
import Grid2 from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';

export const AddItemsShoppingCart = () => {
  
  const { sellCards, cart } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10; // Número de tarjetas por página
  const totalAmount = 100;
  const cardsWithQuantity = sellCards.map( (card,index) => ({
    ...card,
    amount:9,
    index: (cardsPerPage * (currentPage - 1)) + (index + 1)
   }));

  // Determina qué tarjetas mostrar según la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  //const currentCards = cardsWithQuantity.slice(indexOfFirstCard, indexOfLastCard);
  const currentCards = cardsWithQuantity;


  useEffect(() => {
     dispatch(getCardsByPagination(cardsPerPage,currentPage-1));
  }, [currentPage]);
  // Función para manejar el cambio de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(getCards(cardsPerPage)); // Obtener las tarjetas al cargar el componente
  }, [dispatch]);

  return (
    <div>
      {/* Mostrar las tarjetas con la cantidad de la página actual */}
      <Grid2 container spacing={2}>
        {currentCards.map((card, index) => (
          <CardApp key={index} cards={card} index={index + 1} />
        ))}
      </Grid2>

      {/* Paginación */}
      <Pagination
        count={Math.ceil(totalAmount / cardsPerPage)} // Total de páginas
        page={currentPage} // Página actual
        onChange={handlePageChange} // Función para cambiar de página
        color="primary"
        sx={{ mt: 2 }} // Espaciado superior
      />
    </div>
  );
};

export default AddItemsShoppingCart;
