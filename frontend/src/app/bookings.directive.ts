import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bookingSlot]'
})
export class BookingsDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  
  @HostListener('mouseover') 
   onMouseOver() {
       this.renderer.addClass(this.elRef.nativeElement, 'taken');
   }
   @HostListener('mouseleave') 
   onMouseLeave() {
       this.renderer.removeClass(this.elRef.nativeElement, 'taken');
   } 

}
