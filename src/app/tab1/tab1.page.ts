import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

   peliculasNuevas: Pelicula[] = [];
   populares:Pelicula [] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(){
    this.moviesService.getFeacture()
     .subscribe (resp  => {
       console.log('Respuesta', resp)
      this.peliculasNuevas= resp.results;
    })

    this.getPopular();
  }
   cargarMas(){
    this.getPopular();
   }

   getPopular(){
    this.moviesService.getPopulares()
    .subscribe(resp => {
      const peliculasTemp = [...this.populares,...resp.results];
      this.populares= peliculasTemp;
    });
   }
}
