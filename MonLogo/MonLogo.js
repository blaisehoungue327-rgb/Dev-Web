let regexTel = /^01\s?[0-9]{8}$/;
let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regexTexte = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

const verificationNom = (nom) => {
    let n = nom.trim();
    if (n === "") return "Champs vide";
    if (n.length < 3) return "Au moins trois lettres";
    if (!regexTexte.test(n)) return "invalide";
    return "";
}

const verificationPrenom = (prenom) => {
    let n = prenom.trim();
    if (n === "") return "Champs vide";
    if (n.length < 3) return "Au moins trois lettres";
    if (!regexTexte.test(n)) return "invalide";
    return "";
}

const verificationEmail = (email) => {
        let mail = email.trim();
        if (mail === "") return "Champs vide";
        if (!regexEmail.test(mail)) return "invalide";
        return "";
}

const verificationTel = (tel) => {
        let numero = tel.trim();
        if (numero === "") return "Champs vide";
        if (!regexTel.test(numero)) return "invalide";
        return "";
}

const form = document.getElementById("inscription");

const VlaideInvalide = () =>{
    const inputs = document.querySelectorAll(".form input");
    console.log("tes inputs\n", inputs);
    inputs.forEach(input => {
        input.classList.remove("valider", "invalider");
    });
};
if(form){
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valide = true;

        VlaideInvalide();


        let nomInput = document.getElementById("nom");
        let nom = nomInput.value;
        let erreurNom = verificationNom(nom);
        let invalidNom= document.querySelector(".invalidNom");
        console.log("ton p invalidNom\n",invalidNom);
        invalidNom.textContent = erreurNom;
        if(erreurNom !== ""){
            nomInput.classList.add("invalider");
            valide = false;
        }else{
            nomInput.classList.add("valider");
        }

        let prenomInput = document.getElementById("prenom");
        let prenom = prenomInput.value
        let erreurPrenom = verificationPrenom(prenom);
        document.querySelector(".invalidPrenom").textContent = erreurPrenom;
        if (erreurPrenom !== "") {
            prenomInput.classList.add("invalider");
            valide = false;
        } else {
            prenomInput.classList.add("valider");
        }

        let emailInput = document.getElementById("mail");
        let email = emailInput.value;
        let erreurEmail = verificationEmail(email);
        document.querySelector(".invalidMail").textContent = erreurEmail;
        if (erreurEmail !== "") {
            emailInput.classList.add("invalider");
            valide = false;
        } else {
            emailInput.classList.add("valider");
        }

        let telInput = document.getElementById("numero");
        let tel = telInput.value;
        let erreurTel = verificationTel(tel);
        document.querySelector(".invalidTel").textContent = erreurTel;
        if (erreurTel !== "") {
            telInput.classList.add("invalider");
            valide = false;
        } else {
            telInput.classList.add("valider");
        }

        if(valide){
           document.querySelector(".invalidNom").textContent = "Validé";
           document.querySelector(".invalidNom").style.color= "green";
           document.querySelector(".invalidPrenom").textContent = "Validé";
           document.querySelector(".invalidPrenom").style.color= "green";
           document.querySelector(".invalidMail").style.color= "green";
           document.querySelector(".invalidMail").textContent = "Validé";
           document.querySelector(".invalidTel").textContent = "Validé";
           document.querySelector(".invalidTel").style.color= "green";
       
        } else {
           document.querySelector(".invalidNom").style.color= "red";
           document.querySelector(".invalidPrenom").style.color= "red";
           document.querySelector(".invalidMail").style.color= "red";
           document.querySelector(".invalidTel").style.color= "red";
        }


    });
}
