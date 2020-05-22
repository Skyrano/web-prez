import { Injectable } from '@angular/core';

@Injectable() //ce service sera utilisé ailleurs et doit donc être injectable dans un autre component

//Ce service permet de générer une fenêtre d'erreur en cas de besoins afin d'avertir l'utilisateur
export class ErrorManager {

    closed:boolean = true;  //indique l'état de la fenêtre
    error_message:string = "";  //contient le message de la fenêtre

    //affiche une erreur
    print_error(error_msg){
        this.error_message = error_msg;
        this.closed = false;
    }

    //ferme l'erreur
    close_error(){
        this.closed = true;
    }

}
