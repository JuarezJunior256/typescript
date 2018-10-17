import { View } from './View';

export class MensagemView extends View<string>{


       template(model: string): string{
    
            return `<b class="alert alert-info">${model}</b>`;
        }
    
    }



