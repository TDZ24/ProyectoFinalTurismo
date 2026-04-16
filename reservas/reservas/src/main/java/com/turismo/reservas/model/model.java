package com.turismo.reservas.model;

public class Reserva {

    private Long id;
    private String nombre;
    private String destino;
    private String fecha;
    private int personas;

    public Reserva(Long id, String nombre, String destino, String fecha, int personas) {
        this.id = id;
        this.nombre = nombre;
        this.destino = destino;
        this.fecha = fecha;
        this.personas = personas;
    }
}