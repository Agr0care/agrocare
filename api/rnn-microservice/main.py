import tensorflow as tf
import numpy as np
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel

data = pd.read_csv('data.csv')

train_data = data.iloc[]
test_data = data.iloc[]

input_sequence = tf.keras.layers.Input(shape=(None, 4))
output_sequence = tf.keras.layers.LSTM(units=32)(input_sequence)
output_sequence = tf.keras.layers.Dense(units=4)(output_sequence)

model = tf.keras.models.Model(inputs=input_sequence, outputs=output_sequence)

model.compile(loss='mse', optimizer='adam')

model.fit(x=train_data.values, y=train_data.values, epochs=50, batch_size=64, validation_split=0.2)

app = FastAPI()

class InputData(BaseModel):
    air_humidity: int
    soil_moisture: int
    temperature: float
    brightness: int

@app.post('/predict')
def predict(data: InputData):
    input_data = np.array([[[
        data.air_humidity,
        data.soil_moisture,
        data.temperature,
        data.brightness
    ]]])
    prediction = model.predict(input_data)[0][0]
    return {'prediction': prediction}

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
