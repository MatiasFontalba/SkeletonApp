import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  usuarioRecibido: string = '';
  datosForm: FormGroup;

  constructor(private route: ActivatedRoute,
             private formBuilder: FormBuilder,
             private alertController:AlertController) {
    this.datosForm=this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nivelEducativo: ['', Validators.required],
      fechaNacimiento: ['']
    })
  }

  ngOnInit() {
    const usuario = this.route.snapshot.paramMap.get('usuario');
    this.usuarioRecibido = usuario !== null ? usuario : '';
  }
  limpiarCampos(){
    this.datosForm.reset();
  }

  async mostrarPopup() {
    if (this.datosForm) {
    const nombre = this.datosForm.get('nombre')?.value;
    const apellido = this.datosForm.get('apellido')?.value;

    if (nombre !== null && apellido !== null) { 
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es: ${nombre} ${apellido}`,
      buttons: ['Yes']
    });

    await alert.present();
    }
  }
 }
}