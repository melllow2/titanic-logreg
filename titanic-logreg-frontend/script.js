document.getElementById("predictionForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    Pclass: Number(document.getElementById("Pclass").value),
    Sex: document.getElementById("Sex").value,
    Age: Number(document.getElementById("Age").value),
    SibSp: Number(document.getElementById("SibSp").value),
    Parch: Number(document.getElementById("Parch").value),
    Fare: Number(document.getElementById("Fare").value)
  };

  try {
    const response = await fetch(
      "https://beliul-titanic-logreg-v2pa.onrender.com/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    document.getElementById("result").innerText =
      result.prediction === 1
        ? `Survived ✅ (Probability: ${result.probability.toFixed(2)})`
        : `Did NOT Survive ❌ (Probability: ${result.probability.toFixed(2)})`;

  } catch (error) {
    document.getElementById("result").innerText = "Error connecting to backend.";
  }
});














