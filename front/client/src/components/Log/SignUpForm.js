import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [profil_nom, setNom] = useState("");
  const [profil_prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const profil_nomError = document.querySelector(".nom.error");
    const profil_prenomError = document.querySelector(".prenom.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    profil_nomError.innerHTML = "";
    profil_prenomError.innerHTML = "";
    emailError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";

      if (!profil_nom) profil_nomError.innerHTML = "Veuillez entrez votre nom";

      if (!profil_prenom)
        profil_prenomError.innerHTML = "Veuillez entrez votre prenom";

      if (!email) emailError.innerHTML = "Veuillez entrez un email valide";
    } else {
      await axios({
        method: "post",
        url: `http://localhost:5000/api/user/register`,
        data: {
          profil_nom,
          profil_prenom,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.message3) {
            emailError.innerHTML = res.data.message3;
          }
          if (res.data.message2) {
            passwordError.innerHTML = res.data.message2;
          } else if (!res.data.message3 || res.data.message2) {
            setFormSubmit(true);
          }
        })

        .catch((err) => console.log(err));
    }
  };

  //Si form Submit est true => affichage Profil utilisateur
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, vous pouvez maintenant vous connecter !
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="profil_nom">Nom</label>
          <br />
          <input
            type="text"
            name="profil_nom"
            id="profil_nom"
            onChange={(e) => setNom(e.target.value)}
            value={profil_nom}
          />
          <div className="nom error"></div>
          <br />
          <label htmlFor="profil_prenom">Prénom</label>
          <br />
          <input
            type="text"
            name="profil_prenom"
            id="profil_prenom"
            onChange={(e) => setPrenom(e.target.value)}
            value={profil_prenom}
          />
          <div className="prenom error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
