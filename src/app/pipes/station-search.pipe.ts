import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stationSearch'
})
export class StationSearchPipe implements PipeTransform {

  transform(items: string[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.toLowerCase().indexOf(filter) !== -1);
  }

}
