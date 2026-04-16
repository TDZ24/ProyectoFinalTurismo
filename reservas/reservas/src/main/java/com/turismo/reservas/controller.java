package com.turismo.reservas.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.turismo.reservas.model.Reserva;
import com.turismo.reservas.service.ReservaService;

@RestController
@RequestMapping("/reservas")
@CrossOrigin
public class ReservaController {

    private final ReservaService service;

    public ReservaController(ReservaService service) {
        this.service = service;
    }

   @GetMapping
    public Reserva[] listar() {
        return service.listar();
    }

    @PostMapping
    public Reserva guardar(@RequestBody Reserva reserva) {
        return service.guardar(reserva);
    }
}