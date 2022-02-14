import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stationSearch'
})
export class StationSearchPipe implements PipeTransform {

  transform(items: string[], filter: string): any {
    if (!items || !filter) {
      return [];
    }
    const res = items.filter(item => (item.replace(' //','').toLowerCase().indexOf(filter.toLowerCase()) !== -1));
    if (res.length > 20){
      return [];
    } else {
      return res;
    }
  }

}
