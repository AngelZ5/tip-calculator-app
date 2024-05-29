document.addEventListener("DOMContentLoaded", function () {
  const dollarIcon = document.querySelector(".icon-bill");
  const billInput = document.querySelector("#bill");
  const billLabel = document.querySelector("#bill-label");
  const personIcon = document.querySelector(".icon-person");
  const peopleInput = document.querySelector("#people-input");
  const peopleLabel = document.querySelector("#people-label");
  const error = "Can't be Zero";

  const buttons = document.querySelectorAll(".tip-buttons button");
  const customTipInput = document.querySelector(
    ".tip-buttons input[type='number']"
  );
  const tipAmountDisplay = document.getElementById("value-amount");
  const totalAmountDisplay = document.getElementById("value-total");

  function billInputCheck() {
    dollarIcon.style.display = "none";
    billInput.placeholder = "0";

    const billCount = Number(billInput.value);
    if (billInput.value !== "" && billCount === 0) {
      billLabel.style.color = "red";
      billLabel.textContent = error;
      billInput.style.border = "solid";
      billInput.style.borderColor = "red";
    } else {
      billLabel.style.color = "";
      billLabel.textContent = "Bill";
      billInput.style.borderColor = "";
      billInput.style.border = "none";
    }
    calculateTip();
  }

  function peopleInputCheck() {
    personIcon.style.display = "none";
    peopleInput.placeholder = "0";

    const peopleCount = Number(peopleInput.value);
    if (peopleInput.value !== "" && peopleCount === 0) {
      peopleLabel.style.color = "red";
      peopleLabel.textContent = error;
      peopleInput.style.border = "solid";
      peopleInput.style.borderColor = "red";
    } else {
      peopleLabel.style.color = "";
      peopleLabel.textContent = "Number of People";
      peopleInput.style.borderColor = "";
      peopleInput.style.border = "none";
    }
    calculateTip();
  }

  function preventEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  function calculateTip(tipPercent) {
    const billAmount = Number(billInput.value);
    const numberOfPeople = Number(peopleInput.value);

    if (billAmount > 0 && numberOfPeople > 0) {
      const tipAmount = tipPercent ? (billAmount * tipPercent) / 100 : 0;
      const totalAmount = billAmount + tipAmount;
      const tipPerPerson = tipAmount / numberOfPeople;
      const totalPerPerson = totalAmount / numberOfPeople;

      tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
      totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
    } else {
      tipAmountDisplay.textContent = "$0.00";
      totalAmountDisplay.textContent = "$0.00";
    }
  }

  billInput.addEventListener("input", billInputCheck);
  peopleInput.addEventListener("input", peopleInputCheck);
  billInput.addEventListener("keydown", preventEnter);
  peopleInput.addEventListener("keydown", preventEnter);

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const tipPercent = Number(event.target.textContent.replace("%", ""));
      calculateTip(tipPercent);
    });
  });

  customTipInput.addEventListener("input", () => {
    const customTipPercent = Number(customTipInput.value);
    calculateTip(customTipPercent);
  });
});
