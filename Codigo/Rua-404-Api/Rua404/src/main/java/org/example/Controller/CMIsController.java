package org.example.Controller;

import org.example.Model.Banner;
import org.example.Model.Colecoes;
import org.example.Model.Collabs;
import org.example.Model.Evento;
import org.example.Service.CMIsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/cms")
public class CMIsController {

    @Autowired
    private CMIsService cmisService;

    @GetMapping("/listar-colecoes")
    public ResponseEntity<?> getColecoes() {
        return ResponseEntity.ok().body(cmisService.getColecoesRepository());
    }

    @GetMapping("/listar-banners")
    public ResponseEntity<?> getBanners() {
        return ResponseEntity.ok().body(cmisService.getBanner());
    }

    @GetMapping("/listar-collabs")
    public ResponseEntity<?> getCollabs() {
        return ResponseEntity.ok().body(cmisService.getCollabsRepository());
    }

    @GetMapping("/listar-eventos")
    public ResponseEntity<?> getEventos() {
        return ResponseEntity.ok().body(cmisService.getEventosRepository());
    }

    @GetMapping("/colecao/{id}")
    public ResponseEntity<?> getColecaoByid(Long id) {
        return ResponseEntity.ok().body(cmisService.getColecaoById(id));
    }

    @GetMapping("/banner/{id}")
    public ResponseEntity<?> getBannerById(Long id) {
        return ResponseEntity.ok().body(cmisService.getbannerById(id));
    }

    @GetMapping("/collabs/{id}")
    public ResponseEntity<?> getCollabsById(Long id) {
        return ResponseEntity.ok().body(cmisService.getCollabsById(id));
    }

    @GetMapping("/eventos/{id}")
    public ResponseEntity<?> getEventosById(Long id) {
        return ResponseEntity.ok().body(cmisService.getEventosById(id));
    }

    @PostMapping("/salvar-banner")
    public ResponseEntity<?> savaBanner(Banner banner) {
        return ResponseEntity.ok().body(cmisService.savebannerText(banner));
    }

    @PostMapping("/salvar-colecoes")
    public ResponseEntity<?> saveColecoes(Colecoes colecoes) {
        return ResponseEntity.ok().body(cmisService.saveColecoes(colecoes));
    }

    @PostMapping("/salvar-collabs")
    public ResponseEntity<?> saveCollabs(Collabs collabs) {
        return ResponseEntity.ok().body(cmisService.saveCollabs(collabs));
    }

    @PostMapping("/salvar-eventos")
    public ResponseEntity<?> saveEventos(Evento evento) {
        return ResponseEntity.ok().body(cmisService.saveEventos(evento));
    }

    @PutMapping("/atualizar-banner")
    public ResponseEntity<?> updateBanner(Banner banner) {
        return ResponseEntity.ok().body(cmisService.Updatebanner(banner));
    }

    @PutMapping("/atualizar-colecoes")
    public ResponseEntity<?> updateColecoes(Colecoes colecoes) {
        return ResponseEntity.ok().body(cmisService.UpdateColection(colecoes));
    }

    @PutMapping("/atualizar-collabs")
    public ResponseEntity<?> updateCollabs(Collabs collabs) {
        return ResponseEntity.ok().body(cmisService.UpdateCollabs(collabs));
    }

    @PutMapping("/atualizar-eventos")
    public ResponseEntity<?> updateEventos(Evento evento) {
        return ResponseEntity.ok().body(cmisService.UpdateEventos(evento));
    }

    @DeleteMapping("/deletarBanner")
    public ResponseEntity<?> deleteBanner(Long id) {
        cmisService.deletebanner(id);
        return ResponseEntity.ok().body("Deletado com sucesso");
    }

    @DeleteMapping("/deletar-colecoes")
    public ResponseEntity<?> deleteColecoes(Long id) {
        cmisService.deleteColecoes(id);
        return ResponseEntity.ok().body("Deletado com sucesso");
    }

    @DeleteMapping("/deletar-collabs")
    public ResponseEntity<?> deleteCollabs(Long id) {
        cmisService.deleteCollabs(id);
        return ResponseEntity.ok().body("Deletado com sucesso");
    }

    @DeleteMapping("/deletar-eventos")
    public ResponseEntity<?> deleteEventos(Long id) {
        cmisService.deleteEventos(id);
        return ResponseEntity.ok().body("Deletado com sucesso");
    }

}
