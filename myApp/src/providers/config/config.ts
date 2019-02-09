import { Injectable } from '@angular/core';

let config_key_name= "config";

@Injectable()
export class ConfigProvider {


  private config ={
    showSlide: false,
    name: "",
    username: ""
  }

  constructor() {
    
  }

  //Configuração para recuperar dados do localstroge
  getConfigData(): any {

    return localStorage.getItem(config_key_name);
  }

  //Configuração para gravar dados do localstroge
  setConfigData( showSlide?: boolean, name?: string, username?: string) {

    let config= {
      showSlide: false,
      name: "",
      username: ""
    };

    if(showSlide){
      config.showSlide= showSlide;
    }
    
    if(name){
      config.name= name;
    }

    if(showSlide){
      config.username= username;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config));
    
  }
 

}
