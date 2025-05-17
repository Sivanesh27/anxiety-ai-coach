# /backend/server.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Temporary user storage (in memory)
users = {}

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    userid = data.get("userid")
    if userid in users:
        return jsonify({"message": "User already exists"}), 400
    users[userid] = {
        "password": data.get("password"),
        "email": data.get("email"),
        "phone": data.get("phone"),
        "progress": []
    }
    return jsonify({"message": "User registered successfully"}), 200

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    userid = data.get("userid")
    password = data.get("password")
    user = users.get(userid)
    if not user or user["password"] != password:
        return jsonify({"success": False}), 401
    return jsonify({"success": True}), 200

@app.route("/save_progress", methods=["POST"])
def save_progress():
    data = request.get_json()
    userid = data.get("userid")
    entry = data.get("entry")
    if userid in users:
        users[userid]["progress"].append(entry)
        return jsonify({"message": "Progress saved"}), 200
    return jsonify({"message": "User not found"}), 404

@app.route("/get_progress/<userid>", methods=["GET"])
def get_progress(userid):
    user = users.get(userid)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user["progress"])
