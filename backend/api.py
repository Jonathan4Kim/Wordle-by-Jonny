from flask import Flask, jsonify, session
from flask_cors import CORS
from wordle import Wordle

app = Flask(__name__)
CORS(app)

wordle = Wordle()


@app.route('/initialize_wordle')
def initialize_wordle():
    global wordle
    # reinstate the wordle class
    if 'used_words' not in session:
        session['used_words'] = []
    wordle = Wordle(session['used_words'])
    answer = wordle.get_answer()
    session['used_words'].append(answer)
    return jsonify({'message': 'generate Wordle Instance and Word!'}), 200


@app.route('/check_word/<guess>', methods=["POST"])
def check_word(guess):
    return jsonify({'guess': wordle.check_guess(guess)})


if __name__ == '__main__':
    app.run(debug=True)
