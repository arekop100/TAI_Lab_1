let nav = '<nav><ul class="nav">'+
    '<li class="nav-item">'+
    '<a class="nav-link active" href="index.html"><h2>Home</h2></a>'+
    '</li>'+

    '<li class="nav-item">'+
    '<a class="nav-link active" href="quiz.html"><h2>Quiz</h2></a>'+
    '</li>'+

    '<li class="nav-item">'+
    '<a class="nav-link active" href="contact.html"><h2>Kontakt</h2></a>'+
    '</li>'+
    '</ul></nav>';


let element = document.querySelector(".navbar");
element.innerHTML = nav;

