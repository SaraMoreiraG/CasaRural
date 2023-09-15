import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  phone: string = '';
  email: string = '';
  message: string = '';

  showMessage: boolean = false;
  isError: boolean = false;
  messageText: string = '';

  constructor(private http: HttpClient) {}

  sendEmail() {
    const datos = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      message: this.message,
    };

    // Solicitud HTTP POST al servidor Node.js
    this.http.post('http://localhost:3000/enviar-correo', datos).subscribe({
      next: (respuesta) => {
        console.log('Correo electrónico enviado con éxito', respuesta);
        this.messageText =
          'Mensaje enviado, en breve nos pondremos en contacto contigo.';
      },
      error: (error) => {
        console.error('Error al enviar el correo electrónico', error);
        this.isError = true;
        this.messageText = 'Ha habido un error, prueba a llamarnos.';
      },
    });
    this.showMessage = true;
    // Set a timer to hide the error message after 5 seconds
    setTimeout(() => {
      this.showMessage = false;
    }, 4000);

    this.name = '';
    this.phone = '';
    this.email = '';
    this.message = '';
  }
}
