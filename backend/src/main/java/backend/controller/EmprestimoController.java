package com.mylibrary.backend.controller;

import com.mylibrary.backend.model.Emprestimo;
import com.mylibrary.backend.model.Livro;
import com.mylibrary.backend.model.StatusLivro;
import com.mylibrary.backend.repository.EmprestimoRepository;
import com.mylibrary.backend.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/emprestimos")
@CrossOrigin(origins = "*")
public class EmprestimoController {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private LivroRepository livroRepository;

    @GetMapping
    public List<Emprestimo> listar() {
        return emprestimoRepository.findAll();
    }

    @GetMapping("/ativos")
    public List<Emprestimo> ativos() {
        return emprestimoRepository.findByDataDevolucaoEfetivaIsNull();
    }

    @GetMapping("/atrasados")
    public List<Emprestimo> atrasados() {
        return emprestimoRepository.findByDataDevolucaoEfetivaIsNull()
                .stream()
                .filter(e -> e.getDataDevolucaoPrevista() != null &&
                        e.getDataDevolucaoPrevista().isBefore(LocalDate.now()))
                .toList();
    }

    @PostMapping("/emprestar")
    public ResponseEntity<?> emprestar(@RequestBody Emprestimo emprestimo) {
        Livro livro = livroRepository.findById(emprestimo.getLivro().getId())
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        if (livro.getStatus() == StatusLivro.EMPRESTADO) {
            return ResponseEntity.badRequest().body("Livro já está emprestado");
        }

        livro.setStatus(StatusLivro.EMPRESTADO);
        livroRepository.save(livro);

        emprestimo.setLivro(livro);
        emprestimo.setDataEmprestimo(LocalDate.now());

        return ResponseEntity.ok(emprestimoRepository.save(emprestimo));
    }

    @PostMapping("/{id}/devolver")
    public ResponseEntity<?> devolver(@PathVariable Long id) {
        Emprestimo emprestimo = emprestimoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));

        if (emprestimo.getDataDevolucaoEfetiva() != null) {
            return ResponseEntity.badRequest().body("Livro já foi devolvido");
        }

        Livro livro = emprestimo.getLivro();
        livro.setStatus(StatusLivro.DISPONIVEL);
        livroRepository.save(livro);

        emprestimo.setDataDevolucaoEfetiva(LocalDate.now());
        return ResponseEntity.ok(emprestimoRepository.save(emprestimo));
    }
}