package com.edu.missouristate.painting.services;

import com.edu.missouristate.painting.models.Painting;
import com.edu.missouristate.painting.repositories.PaintingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaintingServiceImpl implements PaintingService {
    PaintingRepository paintingRepository;

    @Autowired
    public PaintingServiceImpl(PaintingRepository paintingRepository) {
        this.paintingRepository = paintingRepository;
    }

    @Override
    public Painting publish(Painting painting) {
        return this.paintingRepository.save(painting);
    }

    @Override
    public Optional<Painting> getById(Integer id) {
        return this.paintingRepository.findById(id);
    }

    @Override
    public List<Painting> getAll() {
        return (List<Painting>) this.paintingRepository.findAll();
    }
}
