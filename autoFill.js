class FilledForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) {
      throw new Error(`Form ID ${formId} not found.`);
    }
  }

  fillField(labelText, value) {
    const labels = this.form.querySelectorAll("label");
    let inputField = null;
    labels.forEach((label) => {
      if (label.textContent.trim() === labelText) {
        const input = label.parentElement.querySelector("input");

        inputField = input;
      }
    });
    if (!inputField) {
      console.error(`Input field for label "${labelText}" not found.`);
      return;
    }
    inputField.value = value;
  }

  fillFields(fields) {
    for (const field in fields) {
      this.fillField(field, fields[field]);
    }
  }
}

class Validator {
  static validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  }

  static validateCardNumber(cardNumber) {
    let sum = 0;
    let double = false;
    let numbers = cardNumber.split(" ").join("");
    for (let i = numbers.length - 1; i >= 0; i--) {
      let digit = parseInt(numbers.charAt(i), 10);

      if (double) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      double = !double;
    }

    return sum % 10 === 0;
  }

  static validateExpiryDate(expiryDate) {
    const today = new Date();
    const parts = expiryDate.split("/");
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10) + 2000;

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
      return false;
    }

    const cardExpiry = new Date(year, month - 1, 1);
    return cardExpiry > today;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const form = new FilledForm("payment-form");
  form.fillFields({
    "Nome Completo": "Lucas Bot",
    Telefone: "(31) 34414-5678",
    "E-mail": "luke@isthebest.com",
    CEP: "31310220",
    Endereço: "Rua OnSubmit if Correct",
    Cidade: "Belo Horizonte",
    Estado: "Minas Gerais",
    "Nome do Titular": "Lucas Bot",
    "Número do Cartão": "5524 3373 3249 3313",
    "Data de Validade": "12/25",
    CVV: "745",
  });

  const errors = [];
  const steps = form.form.querySelectorAll(".form-step");
  steps.forEach((step, index) => {
    const fields = step.querySelectorAll(".input-field input");
    fields.forEach((field) => {
      const label = field.parentElement.querySelector("label");
      const fieldName = label.textContent.trim();
      const fieldValue = field.value.trim();

      switch (fieldName) {
        case "E-mail":
          if (!Validator.validateEmail(fieldValue)) {
            errors.push("Please enter a valid email.");
          }
          break;
        case "Número do Cartão":
          if (!Validator.validateCardNumber(fieldValue)) {
            errors.push("Please enter a valid credit card number.");
          }
          break;
        case "Data de Validade":
          if (!Validator.validateExpiryDate(fieldValue)) {
            errors.push("Please enter a valid expiry date (MM/YY).");
          }
          break;
        default:
          break;
      }
    });
  });

  if (errors.length > 0) {
    const errorMessage = errors.join(" ");
    alert(errorMessage);
  } else {
    console.log("Form filled successfully!");
  }
});

function changeParagraphs() {
  const paragraph = document.querySelectorAll("p");
  paragraph.forEach((e) => {
    e.textContent = "Texto alterado";
  });
}
