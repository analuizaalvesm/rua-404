package org.example.Service;

import java.util.List;

import org.example.Model.Colecoes;
import org.example.Model.Collabs;
import org.example.Model.Evento;
import org.example.Model.Banner;
import org.example.Repositories.BannerRepository;
import org.example.Repositories.ColecoesRepository;
import org.example.Repositories.CollabsRepository;
import org.example.Repositories.EventosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CMIsService {
    
    @Autowired
    private ColecoesRepository colecoesRepository;

    @Autowired
    private CollabsRepository collabsRepository;

    @Autowired
    private EventosRepository eventosRepository;

    @Autowired
    private BannerRepository bannerRepository;

    public List<Colecoes> getColecoesRepository(){
        return colecoesRepository.findAll();
    }
    public List<Banner> getBanner(){
        return this.bannerRepository.findAll();
    }

    public List<Collabs> getCollabsRepository(){
        return collabsRepository.findAll();
    }
    public List<Evento> getEventosRepository(){
        return eventosRepository.findAll();
    }
    public Banner getbannerById(Long id){
        return this.bannerRepository.findById(id).get();
    }
    public Colecoes getColecaoById(Long id){
        return colecoesRepository.findById(id).get();
    }
    public Collabs getCollabsById(Long id){
        return collabsRepository.findById(id).get();
    }
    public Evento getEventosById(Long id){
        return eventosRepository.findById(id).get();
    }
    public Banner savebannerText(Banner bannerPageText){
        return this.bannerRepository.save(bannerPageText);
    }
    public Colecoes saveColecoes(Colecoes colecoes){
        return colecoesRepository.save(colecoes);
    }
    public Collabs saveCollabs(Collabs collabs){
        return collabsRepository.save(collabs);
    }   
    public Evento saveEventos(Evento evento){
        return eventosRepository.save(evento);
    }
    public Banner Updatebanner(Banner bannerText){
        return this.bannerRepository.save(bannerText);
    }
    public Colecoes UpdateColection(Colecoes colecoes){
        return colecoesRepository.save(colecoes);
    }
    public Collabs UpdateCollabs(Collabs collabs){
        return collabsRepository.save(collabs);
    }
    public Evento UpdateEventos(Evento evento){
        return eventosRepository.save(evento);
    }
    public void deletebanner(Long id){
        bannerRepository.deleteById(id);
    }
    public void deleteColecoes(Long id){
        colecoesRepository.deleteById(id);
    }
    public void deleteCollabs(Long id){
        collabsRepository.deleteById(id);
    }
    public void deleteEventos(Long id){
        eventosRepository.deleteById(id);
    }
}
