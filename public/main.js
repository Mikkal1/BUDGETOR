async function calculate() {
    const form = document.getElementById('calculatorForm');
    const formData = new FormData(form);

    const response = await fetch('http://localhost:3000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData),
    });

    const data = await response.json();
    document.getElementById('result').innerText = `Compound Interest: $${data.result}`;
  }