export function throttle(milissegundos = 500){
    
    return function(target: any, propertKey: string, descriptor: PropertyDescriptor){

        //target     => tipo que vai ser passado na funcao
        //propertKey => nome da função 
        //descriptor => dados internos da função

        //pegando dados da função e jogando para constante 
        const  metodoOrginal = descriptor.value;

        let timer = 0;
        
        descriptor.value = function(...args: any[]){

            if(event) event.preventDefault();
            clearInterval(timer);
            timer =  setTimeout(() => metodoOrginal.apply(this, args), milissegundos);
        }

        return descriptor;
    }
}