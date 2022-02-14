import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stationSearch'
})
export class StationSearchPipe implements PipeTransform {

  transform(items: string[], filter: string): any {
    if (!items || !filter) {
      return [];
    }
    const res = items.filter(item => (item.toLowerCase().indexOf(filter) !== -1));
    console.log(res.length);
    if (res.length > 20){
      return [];
    } else {
      return res;
    }
  }

}
