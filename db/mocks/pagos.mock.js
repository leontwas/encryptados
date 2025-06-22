// Mock de pagos (pagos.mock.js)
const pagosMock = [
  { id_pago: 1, orden_id: 1, metodo_pago: 'tarjeta_credito', estado_pago: 'pagado', fecha_pago: '2025-06-21 14:35:00' },
  { id_pago: 2, orden_id: 2, metodo_pago: 'transferencia', estado_pago: 'pagado', fecha_pago: '2025-06-20 10:20:00' },
  { id_pago: 3, orden_id: 3, metodo_pago: 'efectivo', estado_pago: 'pagado', fecha_pago: '2025-06-19 18:10:30' },
  { id_pago: 4, orden_id: 4, metodo_pago: 'tarjeta_credito', estado_pago: 'pendiente', fecha_pago: '2025-06-18 17:05:00' },
  { id_pago: 5, orden_id: 5, metodo_pago: 'transferencia', estado_pago: 'pagado', fecha_pago: '2025-06-17 12:20:10' },
  { id_pago: 6, orden_id: 6, metodo_pago: 'efectivo', estado_pago: 'pagado', fecha_pago: '2025-06-16 19:40:00' },
  { id_pago: 7, orden_id: 7, metodo_pago: 'tarjeta_credito', estado_pago: 'en_disputa', fecha_pago: '2025-06-15 15:30:00' },
  { id_pago: 8, orden_id: 8, metodo_pago: 'efectivo', estado_pago: 'cancelado', fecha_pago: '2025-06-14 13:10:00' },
  { id_pago: 9, orden_id: 9, metodo_pago: 'transferencia', estado_pago: 'pendiente', fecha_pago: '2025-06-13 20:00:00' },
  { id_pago: 10, orden_id: 10, metodo_pago: 'tarjeta_credito', estado_pago: 'pagado', fecha_pago: '2025-06-12 08:45:00' },
  { id_pago: 11, orden_id: 11, metodo_pago: 'tarjeta_credito', estado_pago: 'pagado', fecha_pago: '2025-06-11 10:25:00' },
  { id_pago: 12, orden_id: 12, metodo_pago: 'efectivo', estado_pago: 'pendiente', fecha_pago: '2025-06-10 16:55:00' }
];
export default pagosMock;