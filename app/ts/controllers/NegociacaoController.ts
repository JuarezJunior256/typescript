import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes }     from '../models/Negociacoes';
import { Negociacao }      from '../models/Negociacao';
import { NegociacaoParcial } from '../models/NegociacaoParcial';
import { domInject, throttle }      from '../helpers/decorators/index';
import { NegociacaoService }      from '../service/NegociacaoService';
import { handlerFunction }      from '../service/NegociacaoService';
import { imprime }      from '../helpers/Ultis';


export class NegociacaoController{

    @domInject('#data')
    private _inputData: JQuery;
    
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    
    @domInject('#valor')
    private _inputValor: JQuery;
    
    //classe negociacoes
    private _negociacoes =     new Negociacoes();

    //classe negociacoesView
    private _negociacoesView = new NegociacoesView('#negociacoesView');

    //classe mensagemView
    private _mensagemView    = new MensagemView('#mensagemView');

    //classe de serviço para consumir api
    private _service = new NegociacaoService();

    constructor(){

        
        this._negociacoesView.update(this._negociacoes);

    }

    @throttle()
    adiciona(){ //Adicionando uma negociacao 

        //pegando data atual 
        let data = new Date(this._inputData.val().replace(/-/g, ','));

        //validação para saber se é um dia util(segunda a sexta)
        if(this._ehDiaUtil(data)){

            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return 
        }
            
       //criando uma negociacao 
       const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, ',')), 
            parseInt(this._inputQuantidade.val()), 
            parseFloat(this._inputValor.val())
        );

            

            //adicionando uma negociacao no array
            this._negociacoes.adiciona(negociacao);
            
            imprime(negociacao, this._negociacoes);

            //adicionando o array de negociacao na tabela html
            this._negociacoesView.update(this._negociacoes);

            //mensagem para quando uma negociação é adicionada na tabela
            this._mensagemView.update('Negociação adicionada com sucesso!');
    }

        //metodo para verificar se é dia útil
        private _ehDiaUtil(data: Date){
            return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;  
        }

        @throttle()
        async importaDados(){

            try{

                const negociacoesParaImportar = await this._service
                .obterNegociaoces(res => {
    
                    if(res.ok){
                        return res;
                    }else{
                        throw new Error(res.statusText);
                    }
    
                });
                    
                    const negociacoesJaImportadas = this._negociacoes.paraArray();
    
                    negociacoesParaImportar
                        .filter(negociacao => 
                            !negociacoesJaImportadas.some(jaImportada => 
                                negociacao.ehIgual(jaImportada)))
                        .forEach(negociacao => 
                        this._negociacoes.adiciona(negociacao));
    
                    this._negociacoesView.update(this._negociacoes);

            }catch(err){
                this._mensagemView.update(err.message);
            }
           

                
        }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta, 
    Quinta, 
    Sexta, 
    Sabado, 
}