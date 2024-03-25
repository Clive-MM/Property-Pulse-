from flask import jsonify,request,render_template
from app import app, db,User,Profile
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity


#Initialize the bcrypt
bcrypt = Bcrypt(app)

# Initialize the JWT manager
jwt = JWTManager(app,db)



# Set the secret key for JWT
app.config['JWT_SECRET_KEY'] = 'VMt9di-MO_mHm0vluuMzpiUaQIWC2Mi50lkuA3p4IUs'

# Define the user lookup loader callback function
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(user_id=identity).first()

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



#Route for user login
@app.route('/login', methods=(['POST']))
def user_login():
    data =request.get_json()
    email= data.get('email')
    password= data.get('password')

    user= User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity={'user_id': user.user_id})
        return jsonify({'access_token': access_token, 'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid Credentials!'}), 401
    
#Setting up user profile
@app.route('/profile', methods=['POST'])
@jwt_required()
def create_profile():
    # Get the user ID from the JWT token
    current_user = get_jwt_identity()

    # Extract user_id from the current_user dictionary
    current_user_id = current_user['user_id']

    # Check if the user is registered
    existing_user = User.query.get(current_user_id)
    if not existing_user:
        return jsonify({'message': 'Only registered users can create their Profiles!'})

    data = request.get_json()

    # Extract the user profile attributes
    firstname = data.get('firstname')
    middlename = data.get('middlename')
    surname = data.get('surname')
    contact = data.get('contact')
    address = data.get('address')
    passport_url = data.get('passport_url')
    identification_number_url = data.get('identification_number_url')

    # Create a new profile instance for the existing user
    new_profile = Profile(
        user_id=current_user_id,
        firstname=firstname,
        middlename=middlename,
        surname=surname,
        contact=contact,
        address=address,
        passport_url=passport_url,
        identification_card_url=identification_number_url
    )

    db.session.add(new_profile)
    db.session.commit()

    return jsonify({'message': 'Profile created successfully!'})

#Editing and updating user profile
@app.route('/edit_profile', methods=['GET', 'POST'])
@jwt_required()
def edit_profile():
    try:
        # Get userID from the JWT token
        current_user = get_jwt_identity()['user_id']

        # Extract user_id from the current_user dictionary
        current_user_id = current_user['user_id']

        # Check if the user is registered
        existing_user = User.query.get(current_user_id)
        if not existing_user:
            return jsonify({'message': 'User not registered!'}), 400

        if request.method == 'GET':
            return render_template('landlord.html', user=existing_user)

        if request.method == 'POST':
            data = request.get_json()
            firstname = data.get('firstname')
            middlename = data.get('middlename')
            surname = data.get('surname')
            contact = data.get('contact')
            address = data.get('address')
            passport_url = data.get('passport_url')
            identification_Card_url = data.get('identification_Card_url')

            # Update the user's profile with the provided data
            existing_user.firstname = firstname
            existing_user.middlename = middlename
            existing_user.surname = surname
            existing_user.contact = contact
            existing_user.address = address
            existing_user.passport_url = passport_url
            existing_user.identification_Card_url = identification_Card_url

            db.session.commit()

            return jsonify({'message': 'Profile updated successfully!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


    
    
                




    
if __name__ == '__main__':
    app.run(debug=True)