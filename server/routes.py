from flask import jsonify,request
from app import app, db
from flask_cors import CORS
from datetime import datetime

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
