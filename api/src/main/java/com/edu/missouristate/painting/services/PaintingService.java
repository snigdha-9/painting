package com.edu.missouristate.painting.services;

import com.edu.missouristate.painting.models.Painting;

import java.util.List;
import java.util.Optional;

public interface PaintingService {
    public Painting publish(Painting painting);

    public Optional<Painting> getById(Integer id);

    public List<Painting> getAll();
}
