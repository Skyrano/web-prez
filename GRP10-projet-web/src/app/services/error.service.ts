import { Injectable } from '@angular/core';

@Injectable()

export class ErrorManager {

    closed:boolean = true;
    error_message:string = "";

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
