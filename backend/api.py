from flask import Flask, jsonify, session
from flask_cors import CORS
from wordle import Wordle

app = Flask(__name__)
CORS(app)
app.secret_key = 'wordle-by-jonathan4kim'

wordle = Wordle()


@app.route('/api/initialize_wordle', methods=["POST"])
def initialize_wordle():
    global wordle
    # reinstate the wordle class
    if 'used_words' not in session:
        session['used_words'] = []
    wordle = Wordle()
    answer = wordle.get_answer()
    session['used_words'].append(answer)
    print(answer)
    return jsonify({'message': 'generate Wordle Instance and Word!'}), 200


@app.route('/api/check_word/<guess>', methods=["POST"])
def check_word(guess):
    print(f"guess is: {guess}")
    if not wordle.is_valid_guess(guess):
        return jsonify({'error': 'guess is invalid'}), 500
    guess_after = wordle.check_guess(guess)
    print(guess_after)
    return jsonify({'guess': wordle.check_guess(guess)}), 200


if __name__ == '__main__':
    app.run(debug=True)
