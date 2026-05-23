package com.mylibrary.backend.controller;

import com.mylibrary.backend.model.Livro;
import com.mylibrary.backend.model.StatusLivro;
import com.mylibrary.backend.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "*")
public class LivroController {

    @Autowired
    private LivroRepository repository;

    @GetMapping
    public List<Livro> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public List<Livro> buscar(@RequestParam String termo) {
        return repository.findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(termo, termo);
    }

    @GetMapping("/por-categoria/{categoriaId}")
    public List<Livro> porCategoria(@PathVariable Long categoriaId) {
        return repository.findByCategoria_Id(categoriaId);
    }

    @GetMapping("/por-status/{status}")
    public List<Livro> porStatus(@PathVariable StatusLivro status) {
        return repository.findByStatus(status);
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Livro livro) {
        livro.setStatus(StatusLivro.DISPONIVEL);
        return ResponseEntity.ok(repository.save(livro));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        Livro livro = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        if (livro.getStatus() == StatusLivro.EMPRESTADO) {
            return ResponseEntity.badRequest().body("Não é possível excluir livro emprestado");
        }

        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}