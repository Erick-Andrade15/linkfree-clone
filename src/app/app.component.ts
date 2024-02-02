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
}
