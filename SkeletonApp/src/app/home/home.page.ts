import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  usuarioRecibido: string = '';
  datosForm: FormGroup;
  fechaNacimiento: string = "";

  constructor(private route: ActivatedRoute,
             private formBuilder: FormBuilder,
             private alertController:AlertController,
             private animationCtrl: AnimationController) {
    this.datosForm=this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nivelEducativo: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required, this.fechaValidaValidator()]]
    })
  }

  ngOnInit() {
    const usuario = this.route.snapshot.paramMap.get('usuario');
    this.usuarioRecibido = usuario !== null ? usuario : '';

    this.startAnimation();
    
  }

   async startAnimation(){        //Animacion del titulo
    const titleElement = document.querySelector('.title');
    if (titleElement){
    const titleAnimation = this.animationCtrl.create()
    .addElement(titleElement)
    .duration(5000)
    .iterations(Infinity)
    .fromTo('opacity', 0.2, 1)//por lo qye entendi el primer numero es la opacidad y el segundo el tiempo
    .keyframes([
      { offset: 0, transform: 'translateX(0)' }, // Inicio, sin desplazamiento
      { offset: 0.5, transform: 'translateX(100%)' }, // Desplazamiento hacia la derecha al 50%
      { offset: 0.5, transform: 'translateX(-100%)' } // Regreso hacia la izquierda al 100%
    ]) // Desplazamiento de izquierda a derecha
    console.log('Se ejecuta la animacion');
    
    titleAnimation.play();
    } else{
	  console.log("no se encontró elemento en la clase title");
    }
  }

  async startAnimationInput(){     //Animacion de inputs
    console.log('Input animacion');
    const inputElement1 = document.querySelector('.input1');
    const inputElement2 = document.querySelector('.input2');
    if (inputElement1 && inputElement2){
    const inputAnimation = this.animationCtrl.create()
    .addElement(inputElement1)
    .addElement(inputElement2)
    .duration(1000)
    .iterations(1)
    .fromTo('transform', 'translateX(-12%)', 'translateX(0)');
    console.log('Ejecucion de inputs');
  
    inputAnimation.play();
   } else{
    console.log("no se encontró input");
   }
  }

  limpiarCampos(){
    this.datosForm.reset();
  }

  fechaValidaValidator(){
    return (control: FormControl): {[ key: string]: boolean} | null => {
      const fechaIngresada = new Date(control.value);
      const fechaMinima = new Date('1920-01-01');
      const fechaMaxima = new Date('2023-01-01');

      if (isNaN(fechaIngresada.getTime()) || fechaIngresada < fechaMinima || fechaIngresada > fechaMaxima ){
        return {'fechaInvalida': true};
      }
      return null;
    };
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