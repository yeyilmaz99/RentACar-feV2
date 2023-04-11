import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

transform(value: Car[], filterText: string): Car[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText?value.filter((car:Car) => 
      car.carName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
