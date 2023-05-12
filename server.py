import os
import openai
from flask import Flask, render_template, request

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/', methods=['GET', 'POST'])
def home():
    answer = None
    if request.method == 'POST':
        text = request.form.get('text')
        prompt = f"Patient: {text}\nDoctor:"
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            temperature=0.7,
            max_tokens=512,
            top_p=1,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            stop=["\n"]
        )
        answer = response.choices[0].text.strip()

    return render_template('index.html', answer=answer)

if __name__ == '__main__':
    app.run(debug=True)
