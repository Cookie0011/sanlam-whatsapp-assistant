import {products} from './products'
export const menu=['Funeral Cover','Life Cover','Healthcare – EssentialMED','Savings & Investments','Retirement Planning','I’m not sure','Talk to Thabiso']
export function reply(text:string){const t=text.toLowerCase();if(t.includes('funeral'))return products[0];if(t.includes('life'))return products[1];if(t.includes('medical')||t.includes('essential'))return products[2];if(t.includes('invest to own'))return products[3];if(t.includes('tax free')||t.includes('tax-free'))return products[4];if(t.includes('retirement'))return products[5];return null}
