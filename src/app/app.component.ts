import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

import { ClipboardService } from 'ngx-clipboard';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'linkfree-clone';
  data: any;

  constructor(
    private http: HttpClient,
    private clipboardService: ClipboardService,
  ) {}

  ngOnInit() {
    this.http.get('assets/data.json').subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }

  copiarAlPortapapeles(item: any) {
    const enlace = item.url;
    this.clipboardService.copyFromContent(enlace);
  }

  compartirEnlace(item: any) {
    const enlace = item.url;
    const texto = "Descubre lo increíble de " + item.name + " siguiéndome ahora! 🌟"
    if (navigator.share) {
      // Si el navegador admite la API de Compartir
      navigator
        .share({
          title: 'Echa un vistazo a este enlace:',
          text: texto,
          url: enlace,
        })
        .then(() => console.log('Enlace compartido con éxito'))
        .catch((error) => console.error('Error al compartir:', error));
    } else {
      // Si el navegador no admite la API de Compartir, enlace en el portapapeles
      const enlaceCompleto = `${texto}:\n${enlace}`;
      console.log(enlaceCompleto);
      this.clipboardService.copyFromContent(enlaceCompleto);
    }
  }

}
