import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  miFormulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
    ) { 
    this.miFormulario = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      password: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(3)]] 
    })
  }

  ngOnInit() {
  }
enviarFormulario(){
  if(this.miFormulario.valid){
    const formData = this.miFormulario.value;
    console.log(formData);
  }
}

iniciarSesion(){
  if(this.miFormulario.valid){
    const usuarioIngresado = this.miFormulario.value.usuario;

    this.router.navigate(['/home', usuarioIngresado]);
  } else {
    console.log('Ocurrio un error')
  }
}
}
