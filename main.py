from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
import sys

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:path>')
def login_done(path):
    return render_template('login_done.html')


if __name__ == '__main__':
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            port = 8080
    else:
        port = 8080
    app.run(debug=False, host='localhost', port=port)
