from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import json
import os

app = Flask(__name__)
CORS(app)

# Load model
MODEL_PATH = os.path.join("model", "titanic_model.joblib")
model = joblib.load(MODEL_PATH)

# Load schema
with open(os.path.join("model", "schema.json")) as f:
    schema = json.load(f)

@app.route("/")
def home():
    return "Titanic Logistic Regression API is running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Convert input JSON to DataFrame
    input_df = pd.DataFrame([data])

    # Ensure column order
    input_df = input_df[schema["required_columns"]]

    prediction = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0].max()

    return jsonify({
        "prediction": int(prediction),
        "probability": float(probability)
    })

if __name__ == "__main__":
    app.run(debug=True)






