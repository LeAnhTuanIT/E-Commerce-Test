<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;
    public $userName;
    public $activationLink;

    /**
     * Create a new message instance.
     *
     * @param string $userName
     * @param string $activationLink
     * @return void
     */
    public function __construct($userName, $activationLink)
    {
        $this->userName = $userName;
        $this->activationLink = $activationLink;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Account Activation')
            ->view('emails.sendmail');
    }
}
