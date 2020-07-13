import { Injectable, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { IWindowSizeProps } from '../../../shared/models/window';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  public resizeEvent: Subject<IWindowSizeProps> = new Subject<IWindowSizeProps>();

  constructor() {}

}
