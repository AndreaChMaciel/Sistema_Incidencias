<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Incidencia;

class IncidenciaRegistradaNotification extends Notification
{
    use Queueable;

    protected $incidencia;
    /**
     * Create a new notification instance.
     */
    public function __construct(Incidencia $incidencia)
    {
        $this->incidencia = $incidencia;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)

        ->subject('Incidencia Registrada')
        ->line('Usted ha registrado una nueva incidencia con los siguientes detalles:')
        ->line('Título: ' . $this->incidencia->ct_nombre)
        ->line('Descripción: ' . $this->incidencia->ct_descripcion)
        ->line('Lugar: ' . $this->incidencia->ct_lugar)
        ->line('Número de Incidencia: ' . $this->incidencia->ct_id_incidencia)
        //->action('Ver Incidencia', url('/incidencias/' . $this->incidencia->id))
        ->line('Gracias por utilizar nuestra aplicación!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
