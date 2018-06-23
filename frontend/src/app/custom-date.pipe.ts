import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'customDate' })
export class CustomDatePipe implements PipeTransform {
    transform(date: Date): string {
        date = new Date;
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}
