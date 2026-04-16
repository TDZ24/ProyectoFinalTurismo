package com.turismo.reservas.repositoryinterface;

import com.turismo.reservas.model.Reserva;

public interface ReservaRepository {

    Reserva[] listar();
    Reserva guardar(Reserva reserva);
}