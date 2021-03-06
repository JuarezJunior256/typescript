import { Imprimivel }  from './Imprimivel';
import { Igualavel } from './Igualavel';

export class Negociacao implements Imprimivel, Igualavel<Negociacao>{

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number){

        
    }

    get volume(){
        return this.quantidade * this.valor;
    }

    paraTexto(): void{

        console.log('--paraTexto--');
        console.log(`
        
           Data: ${this.data}
           Quantidade: ${this.quantidade}
           Data: ${this.valor}
           volume: ${this.volume}`
        );
    }

    ehIgual(negociacao: Negociacao): boolean{

        return this.data.getDate() == negociacao.data.getDate()
            && this.data.getMonth() == negociacao.data.getMonth()
            && this.data.getFullYear() == negociacao.data.getFullYear();
    
    }
}