import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';
import { IntroPage } from '../intro/intro';
import { FilmeDetalhesPageModule } from '../filme-detalhes/filme-detalhes.module';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
      titulo: "Cleano Ferreira",
      date: "November 5, 1995",
      descricao: "Estou criando um app com o ionic framework",
      qntd_likes: 12,
      qntd_comments: 4,
      time_comments: "11h ago"
  }

  //public nome_usuario:string = "Cleano Ferreira do Codigo";

  public lista_filmes= new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public page= 1;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController) {
  }


  abreCarregando() {
    this.loader= this.loadingCtrl.create({
      content: "Carregando Filmes..."
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  /*
  public somaDoisNumero(num1:number, num2:number): void{
    alert(num1 + num2);
  }*/

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;   
    this.carregarFilmes(); 
  }


  ionViewDidEnter() {
    
    this.carregarFilmes();

  }

  abirDetalhes(filme){
    console.log(filme); 
    this.navCtrl.push(FilmeDetalhesPage, {id : filme.id});
  }

  doInfinite(infiniteScroll) {

    this.page++;

    this.infiniteScroll= infiniteScroll;

    this.carregarFilmes(true);

    //infiniteScroll.complete();
  }

  carregarFilmes(newpage:boolean = false){

    this.abreCarregando();
    //função para retornar os dados da API
    this.movieProvider.getLatesMovies(this.page).subscribe(
      data =>{
      
        let response= (data as any);// transformar os dados em qualquer coisa o any
        let objeto_retorno= JSON.parse(response._body);
        
        if(newpage){
           this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results); 
           this.infiniteScroll.complete();
        }else{
          this.lista_filmes = objeto_retorno.results; 
        }
        
        
        //console.log(this.lista_filmes);
        this.fechaCarregando();

        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing= false;
        }
      
      }, error =>{

        console.log(error);  

        this.fechaCarregando(); 

        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing= false;
        }

      }
    )

  }
}
