package com.turismo.reservas.repository;

import java.util.List;
import com.turismo.reservas.model.Reserva;

public interface ReservaRepository {
    List<Reserva> listar();
    Reserva guardar(Reserva reserva);
}