package com.turismo.reservas.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.turismo.reservas.model.Reserva;
import com.turismo.reservas.repository.ReservaRepository;

@Service
public class ReservaService {

    private final ReservaRepository repository;

    public ReservaService(ReservaRepository repository) {
        this.repository = repository;
    }

       public Reserva[] listar() {
        return repository.listar();
    }

    public Reserva guardar(Reserva reserva) {
        return repository.guardar(reserva);
    }

}