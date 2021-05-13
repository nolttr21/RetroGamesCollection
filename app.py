from flask import Flask
from flask import render_template, request, redirect, url_for, flash,session # to render the html form
from flask_login import LoginManager, login_user, current_user, logout_user
from wtforms.validators import InputRequired, Length, EqualTo


from models import *
from wtform_fields import *




app = Flask(__name__)
app.secret_key = 'replace later'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://iznerdudsjpzzf:1982cda9506d2b73e304721096531e417eaa77e34c29c3738fa7e6a869397fc6@ec2-52-23-45-36.compute-1.amazonaws.com:5432/dbk31e5m8oor8i'
db = SQLAlchemy(app)


class DataStore:
    userID = "3"

data = DataStore()

@app.route("/",methods=['GET','POST'])
def index():
    reg_form = RegistrationForm()

    if reg_form.validate_on_submit():
        username = reg_form.username.data
        password = reg_form.password.data

        #userId = reg_form.username.data#save our username for usage later


        user = User(username=username,password=password,score1=0,score2=0,score3=0,score4=0)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))

    return render_template("index.html",form=reg_form)

@app.route("/duck_hunt")
def duck_hunt():
    user_object = User.query.filter_by(username=session.get("user",None)).first()
    currentScore = user_object.score1

    return render_template("duckhunt.html",score = currentScore)

@app.route("/duck_hunt/<score>")
def submit_score_1(score):
    #return "high score: %s" % score
    #user_object = User.query.filter_by(username=userID).first()
    user_object = session.query(User).filter(User.username == userID).one()


    currentScore = user_object.score1

    submitScore = int(score)

    if currentScore is None:
        user_object.score1 = score
        currentScore = score
        session.commit()

        return render_template("duckhunt.html",score = currentScore)


    if submitScore > currentScore:
        user_object.score1 = submitScore
        session.commit()

        return render_template("duckhunt.html",score = currentScore)

    #   submit new score
    #redirectd back to duckhunt

@app.route("/snake")
def snake():
    #<h1 class hidden>current high score<h1>
    return render_template("snake.html")

@app.route("/snake/<score>")
def submit_score_2():
    #<h1 class hidden>current high score<h1>
    return render_template("snake.html")
    def submit_score_1(score):
        return "high score: %s" % score
        #if high score is greater
        #   submit new score
        #redirectd back to duckhunt

#@app.route("/space")
    #def space():
        #return render_template("")

@app.route("/asteroids")
def asteroids():
    return render_template("asteroids.html")




@app.route("/login", methods=['GET', 'POST'])
def login():

    login_form = LoginForm()

    # Allow login if validation success
    if login_form.validate_on_submit():

        session["user"]=login_form.username.data
        #data.userId = login_form.username.data#save our username for usage later
        return session.get("user",None)



    return render_template("login.html", form=login_form)

# This is for command line testing
if __name__ == "__main__":
    app.run(debug=True)
