import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  usuarioRecibido: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const usuario = this.route.snapshot.paramMap.get('usuario');
    this.usuarioRecibido = usuario !== null ? usuario : '';
  }
}
