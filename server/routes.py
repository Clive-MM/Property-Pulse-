from flask import jsonify,request
from app import app, db,User
from flask_bcrypt import Bcrypt
import re
from flask_jwt_extended import create_access_token

#Initialize the bcrypt
bcrypt = Bcrypt()


#registration of a new user 
@app.route('/register', methods=['POST'])
def user_registration():
    # Get the JSON data from the request
    data = request.get_json()

    # Extract the user details from the JSON data
    username = data.get('username')
    role = data.get('role')
    email = data.get('email')
    password = data.get('password')

    # Check if the password meets the required complexity criteria
    if len(password) < 8:
        return jsonify({'message': 'Password must be at least 8 characters long!'}), 400
    if not any(char.isupper() for char in password):
        return jsonify({'message': 'Password must contain at least one uppercase letter!'}), 400
    if not any(char.islower() for char in password):
        return jsonify({'message': 'Password must contain at least one lowercase letter!'}), 400
    if not any(char.isdigit() for char in password):
        return jsonify({'message': 'Password must contain at least one digit!'}), 400
    if not any(char in '!@#$%^&*()_+-=[]{}|;:,.<>?/~`' for char in password):
        return jsonify({'message': 'Password must contain at least one special character!'}), 400

    # Check if the role is valid
    roles = ['Admin', 'Tenant', 'Landlord']
    if role not in roles:
        return jsonify({'message': 'Invalid role! Role must be one of: Admin, Tenant, Landlord'}), 400

    # Check if the username already exists
    existing_username = User.query.filter_by(username=username).first()
    if existing_username:
        return jsonify({'message': 'Username already exists!'}), 400

    # Check if the email already exists
    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({'message': 'Email already exists!'}), 400

    # Hash the password before saving it
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a new user instance
    new_user = User(
        username=username,
        role=role,
        email=email,
        password=hashed_password
    )

    # Add the new user to the database session
    db.session.add(new_user)

    # Commit the transaction to save the new user to the database
    db.session.commit()

    # Return a success message
    return jsonify({'message': 'User created successfully!'}), 200 

if __name__ == '__main__':
    app.run(debug=True)

#Route for user login
@app.route('/login', methods=(['POST']))
def user_login():
    data =request.get_json
    email= data.get('email')
    password= data.get('password')

    user= User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity={'user_id': user.id})
        return jsonify({'access_token': access_token, 'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid Credentials!'}), 401