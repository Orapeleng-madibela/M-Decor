<?php
// Check if 'REQUEST_METHOD' is defined and if the form was submitted using the POST method
if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Create a response array that will hold whether the form submission was successful and a message
    $response = array('success' => false, 'message' => '');

    // Check which form was submitted by looking for the 'event-type' input field
    $formType = isset($_POST['event-type']) ? 'booking' : 'contact';

    // Get and sanitize the 'name' and 'email' fields from the form submission to remove harmful characters
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email address';
        echo json_encode($response);
        exit;
    }

    $to = "madibelaorapeleng17@gmail.com";  // Define recipient
    $headers = "From: $email";

    if ($formType === 'booking') {
        // Booking form data
        $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
        $address = filter_input(INPUT_POST, 'address', FILTER_SANITIZE_STRING);
        $postalCode = filter_input(INPUT_POST, 'postal-code', FILTER_SANITIZE_STRING);
        $eventType = filter_input(INPUT_POST, 'event-type', FILTER_SANITIZE_STRING);
        $eventDate = filter_input(INPUT_POST, 'event-date', FILTER_SANITIZE_STRING);
        $eventTime = filter_input(INPUT_POST, 'event-time', FILTER_SANITIZE_STRING);
        $guests = filter_input(INPUT_POST, 'guests', FILTER_SANITIZE_NUMBER_INT);
        $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

        if (empty($phone) || empty($address) || empty($postalCode) || empty($eventType) || empty($eventDate) || empty($eventTime) || empty($guests)) {
            $response['message'] = 'All fields are required';
            echo json_encode($response);
            exit;
        }

        // Set subject for booking
        $subject = "New Booking Request";
        $email_content = "Name: $name\nEmail: $email\nPhone: $phone\nAddress: $address\nPostal Code: $postalCode\nEvent Type: $eventType\nEvent Date: $eventDate\nEvent Time: $eventTime\nGuests: $guests\nMessage: $message\n";

        if (mail($to, $subject, $email_content, $headers)) {
            $response['success'] = true;
            $response['message'] = 'Booking request sent successfully';
        } else {
            $response['message'] = 'Failed to send booking request';
        }

    } else {
        // Contact form data
        $subject = "Event Inquiry";  // Set subject for contact enquiry
        $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
        $email_content = "Name: $name\nEmail: $email\nMessage: $message\n";

        if (mail($to, $subject, $email_content, $headers)) {
            $response['success'] = true;
            $response['message'] = 'Enquiry sent successfully';
        } else {
            $response['message'] = 'Failed to send enquiry';
        }
    }

    echo json_encode($response);
}
?>
