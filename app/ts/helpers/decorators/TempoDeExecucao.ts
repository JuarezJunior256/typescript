export function logarTempoDeExecucao(emSegundos: boolean = false){
    
    return function(target: any, propertKey: string, descriptor: PropertyDescriptor){

        //target => tipo que vai ser passado na funcao
        //propertKey => nome da função 
        //descriptor => dados internos da função

        //pegando dados da função e jogando para constante 
        const  metodoOrginal = descriptor.value;

        
        descriptor.value = function(...args: any[]){

            let unidade = 'ms';
            let divisor = 1;
            if(emSegundos){
                unidade = 's';
                divisor = 1000;
            }
                
            
            console.log('-------------------------------');
            console.log(`parâmetros passados para o método ${propertKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const retorno = metodoOrginal.apply(this, args);
            const t2 = performance.now();
            console.log(`O retorno do método ${propertKey} é ${JSON.stringify(retorno)}`);
            console.log((t2 - t1)/divisor);
            
            return retorno;
        }

        return descriptor;
    }
}