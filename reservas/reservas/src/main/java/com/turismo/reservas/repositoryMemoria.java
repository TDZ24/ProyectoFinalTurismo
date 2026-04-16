package com.turismo.reservas.repository;

import org.springframework.stereotype.Repository;
import com.turismo.reservas.model.Reserva;

@Repository
public class ReservaRepositoryImpl implements ReservaRepository {

    private Reserva[] reservas = new Reserva[2]; 
    private int contador = 0;

    @Override
    public Reserva[] listar() {
        return reservas;
    }

    @Override
    public Reserva guardar(Reserva reserva) {


        if (contador == reservas.length) {
            Reserva[] nuevo = new Reserva[reservas.length * 2];

            for (int i = 0; i < reservas.length; i++) {
                nuevo[i] = reservas[i];
            }

            reservas = nuevo;
        }

        reserva.setId((long) (contador + 1));
        reservas[contador] = reserva;
        contador++;

        return reserva;
    }
}