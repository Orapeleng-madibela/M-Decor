<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process the form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $cellphone = $_POST["cellphone"];
    $selectedService = $_POST["service"];
    $selectedDate = $_POST["date"];

    // Send SMS notification using Twilio
    require __DIR__ . '/vendor/autoload.php'; // Twilio PHP library

    $sid = 'your_twilio_sid';
    $token = 'your_twilio_token';
    $twilio = new Twilio\Rest\Client($sid, $token);

    $message = $twilio->messages
        ->create("business_owner_phone_number", // Replace with the actual business owner's phone number
            array(
                "from" => "your_twilio_phone_number",
                "body" => "New booking received! $name booked $selectedService for $selectedDate."
            )
        );

    // Send email notification using PHPMailer
    require __DIR__ . '/vendor/autoload.php'; // PHPMailer library

    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->isSMTP();
    $mail->Host = 'your_smtp_host';
    $mail->SMTPAuth = true;
    $mail->Username = 'your_smtp_username';
    $mail->Password = 'your_smtp_password';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('business_owner_email', 'Decoration Services');
    $mail->addAddress('business_owner_email'); // Replace with the actual business owner's email
    $mail->Subject = 'New Booking Received';
    $mail->Body = "New booking received!\n\n$name booked $selectedService for $selectedDate.";

    if (!$mail->send()) {
        echo 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Thank you, ' . $name . '! Your ' . $selectedService . ' decoration for ' . $selectedDate . ' is booked.';
    }
} else {
    // If someone tries to access this file directly without submitting the form, redirect them to the index page.
    header("Location: index.html");
    exit();
}
?>
