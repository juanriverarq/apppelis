import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { RespuestaMDB, Pelicula, PeliculaDetalle, ActoresPelicula } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL= environment.url;
const apiKey = environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;

  constructor(private http:HttpClient) { }

  private ejetucarQuery<T>( query:string ) {
    query = URL + query;
    query += `&api_key=${ apiKey }&lenguaje=es`;
    console.log(query);
    return this.http.get<T>( query );
  }

  getPopulares(){
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejetucarQuery<RespuestaMDB>(query);
  }

  getFeacture(){
    
    const hoy =new  Date();
    const ultimoDia = new  Date ( hoy.getFullYear(), hoy.getMonth() + 1,0).getDate();
    const mes= hoy.getMonth() +1;
    let mesString;

    if (mes < 10 ){
     mesString = '0'+ mes;
    
    }else{
      mesString =mes;
    }

    const inicio =`${ hoy.getFullYear()}-${ mesString}-01`;
    const fin =`${ hoy.getFullYear()}-${ mesString}-${ultimoDia}`;

   
     
    return this.ejetucarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`)
  }

  getPeliculaDetalle(id:string){

    return this.ejetucarQuery<PeliculaDetalle>(`/movie/${id}?a=1`)

  }

  getActoresPelicula(id:string){
    return this.ejetucarQuery<ActoresPelicula>(`/movie/${id}/credits?a=1`)
    
  }
}
