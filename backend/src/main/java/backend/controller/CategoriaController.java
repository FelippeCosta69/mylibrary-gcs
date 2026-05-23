package com.mylibrary.backend.controller;

import com.mylibrary.backend.model.Categoria;
import com.mylibrary.backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaRepository repository;

    @GetMapping
    public List<Categoria> listar() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Categoria categoria) {
        if (repository.existsByNome(categoria.getNome())) {
            return ResponseEntity.badRequest().body("Já existe uma categoria com esse nome");
        }
        return ResponseEntity.ok(repository.save(categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        Categoria categoria = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        if (!categoria.getLivros().isEmpty()) {
            return ResponseEntity.badRequest().body("Não é possível excluir categoria com livros vinculados");
        }

        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}