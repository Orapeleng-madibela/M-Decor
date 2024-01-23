document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    let counter = 1;

    function slide() {
        counter++;
        if (counter > slider.children.length) {
            counter = 1;
        }
        slider.style.transform = "translateX(" + -100 * (counter - 1) + "%)";
    }

    setInterval(slide, 3000); // Change slide every 3 seconds (adjust as needed)
});

   // script.js
document.addEventListener("DOMContentLoaded", function () {
    const imageSlider = document.querySelector(".image-slider");
    const totalSlides = imageSlider.children.length;
    let counter = 0;

    function showSlide(index) {
        counter = index;
        imageSlider.style.transform = "translateX(" + -100 * counter + "%)";
    }

    function nextSlide() {
        counter = (counter + 1) % totalSlides;
        showSlide(counter);
    }

    function prevSlide() {
        counter = (counter - 1 + totalSlides) % totalSlides;
        showSlide(counter);
    }

    setInterval(nextSlide, 3000); // Change slide every 3 seconds (adjust as needed)
});


function bookService(serviceName) {
    alert("Booking for " + serviceName + " is in progress. Please wait for confirmation.");
    // You can add more logic for booking here
}

function submitForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const cellphone = document.getElementById("cellphone-number").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;

    // Validate the form fields (you may add more validation)
    if (!name || !email || !cellphone || !service || !date) {
        alert("Please fill in all fields.");
        return;
    }

    // Send the form data to the server
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "process_booking.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
        }
    };

    const formData = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&cellphone=${encodeURIComponent(cellphone)}&service=${encodeURIComponent(service)}&date=${encodeURIComponent(date)}`;
    xhr.send(formData);
}
