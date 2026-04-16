package com.turismo.reservas.repository;

import com.turismo.reservas.model.Reserva;

public interface ReservaRepository {

    Reserva[] listar();
    Reserva guardar(Reserva reserva);
}