from flask import Flask
from flask import render_template, request, redirect, url_for, flash # to render the html form
from flask_login import LoginManager, login_user, current_user, logout_user
from wtforms.validators import InputRequired, Length, EqualTo


from models import *
from wtform_fields import *


app = Flask(__name__)
app.secret_key = 'replace later'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://iznerdudsjpzzf:1982cda9506d2b73e304721096531e417eaa77e34c29c3738fa7e6a869397fc6@ec2-52-23-45-36.compute-1.amazonaws.com:5432/dbk31e5m8oor8i'
db = SQLAlchemy(app)

@app.route("/",methods=['GET','POST'])
def index():
    reg_form = RegistrationForm()

    if reg_form.validate_on_submit():
        username = reg_form.username.data
        password = reg_form.password.data


        user = User(username=username,password=password)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))

    return render_template("index.html",form=reg_form)

@app.route("/login", methods=['GET', 'POST'])
def login():

    login_form = LoginForm()

    # Allow login if validation success
    if login_form.validate_on_submit():
        return "Logged in"

    return render_template("login.html", form=login_form)

# This is for command line testing
if __name__ == "__main__":
    app.run(debug=True)
