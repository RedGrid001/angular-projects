import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private renderer2: Renderer2,private elementRef: ElementRef) { }

  ngOnInit() {
    //Necesario para volver a cargar la libreria widgets.js
    let scriptElement = document.createElement('script');
    scriptElement.src = "https://platform.twitter.com/widgets.js"
    this.renderer2.appendChild(this.elementRef.nativeElement, scriptElement);
  }

}
