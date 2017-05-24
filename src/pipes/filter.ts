import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], args: string): any {

        //if ( !(typeof items === "undefined") ){
        //    return items.filter((item) => args == "all" || item.tipo_publicacion.indexOf(args) !== -1);
        //}


        let limit = 50;
        let cant = 0;
        if (!(typeof items === "undefined") && !(typeof args === "undefined")) {


            return items.filter((item) => {
                let str = JSON.stringify(item);
                str = str.toLowerCase();
                args = args.toLowerCase();

                if (str.indexOf(args) >= 0) {
                    if (limit > cant) {
                        cant++;
                        return true;

                    }

                } else {
                    return false;
                }


            });
        } else {
            return [];
        }
        // filter items array, items which match and return true will be kept, false will be filtered out

    }
}
