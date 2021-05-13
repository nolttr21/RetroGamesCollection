from flask import Flask
from flask import render_template, request, redirect, url_for, flash,session # to render the html form
from flask_login import LoginManager, login_user, current_user, logout_user
from wtforms.validators import InputRequired, Length, EqualTo
from sqlalchemy import update,desc,func



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

    score1 = db.session.query(func.max(User.score1)).scalar()

    return render_template("duckhunt.html",score1 = score1)

@app.route("/duck_hunt/<score>")
def submit_score_1(score):
    submitScore = int(score)#represents the score we submitted

    user_object = User.query.filter_by(username=session.get("user",None)).first()#find the user matching the current username of the logged in user
    score1 = user_object.score1#get the current score of the logged in user

    if score1 is None:#submit the new score if one isn't already set
        stmt = update(User).where(User.username == session.get("user",None)).values(score1=submitScore)
        db.session.execute(stmt)
        db.session.commit()

    if submitScore > score1:#submit the new score if it is higher than the one already set
        stmt = update(User).where(User.username == session.get("user",None)).values(score1=submitScore)
        db.session.execute(stmt)
        db.session.commit()


    return redirect(url_for('duck_hunt'))#redirect back to duckhunt




@app.route("/snake")
def snake():
    #<h1 class hidden>current high score<h1>
    score2 = db.session.query(func.max(User.score2)).scalar()

    return render_template("snake.html",score2=score2)

@app.route("/snake/<score>")
def submit_score_2(score):
    submitScore = int(score)#represents the score we submitted

    user_object = User.query.filter_by(username=session.get("user",None)).first()#find the user matching the current username of the logged in user
    score2 = user_object.score2#get the current score of the logged in user

    if score2 is None:#submit the new score if one isn't already set
        stmt = update(User).where(User.username == session.get("user",None)).values(score2=submitScore)
        db.session.execute(stmt)
        db.session.commit()

    if submitScore > score2:#submit the new score if it is higher than the one already set
        stmt = update(User).where(User.username == session.get("user",None)).values(score2=submitScore)
        db.session.execute(stmt)
        db.session.commit()


    return redirect(url_for('snake'))#redirect back to snake

@app.route("/space")
def space():
    score4 = db.session.query(func.max(User.score4)).scalar()

    return render_template("spaceinvaders.html",score4 = score4)

@app.route("/space/<score>")
def submit_score_4(score):
    submitScore = int(score)#represents the score we submitted
    user_object = User.query.filter_by(username=session.get("user",None)).first()#find the user matching the current username of the logged in user
    score4 = user_object.score4#get the current score of the logged in user

    if score4 is None:#submit the new score if one isn't already set
        stmt = update(User).where(User.username == session.get("user",None)).values(score4=submitScore)
        db.session.execute(stmt)
        db.session.commit()

    if submitScore > score4:#submit the new score if it is higher than the one already set
        stmt = update(User).where(User.username == session.get("user",None)).values(score4=submitScore)
        db.session.execute(stmt)
        db.session.commit()


    return redirect(url_for('space'))#redirect back to space invaders


@app.route("/asteroids")
def asteroids():
    score3 = db.session.query(func.max(User.score3)).scalar()
    return render_template("asteroids.html",score3 = score3)

@app.route("/asteroids/<score>")
def submit_score_3(score):
    submitScore = int(score)#represents the score we submitted

    user_object = User.query.filter_by(username=session.get("user",None)).first()#find the user matching the current username of the logged in user
    score3 = user_object.score3#get the current score of the logged in user

    if score3 is None:#submit the new score if one isn't already set
        stmt = update(User).where(User.username == session.get("user",None)).values(score3=submitScore)
        db.session.execute(stmt)
        db.session.commit()

    if submitScore > score3:#submit the new score if it is higher than the one already set
        stmt = update(User).where(User.username == session.get("user",None)).values(score3=submitScore)
        db.session.execute(stmt)
        db.session.commit()


    return redirect(url_for('asteroids'))#redirect back to snake





@app.route("/login", methods=['GET', 'POST'])
def login():

    login_form = LoginForm()

    # Allow login if validation success
    if login_form.validate_on_submit():

        session["user"]=login_form.username.data
        #data.userId = login_form.username.data#save our username for usage later
        return redirect(url_for('home'))



    return render_template("login.html", form=login_form)

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/highscores")
def highscores():
    score1 = db.session.query(func.max(User.score2)).scalar()
    score2 = db.session.query(func.max(User.score1)).scalar()
    score3 = db.session.query(func.max(User.score4)).scalar()
    score4 = db.session.query(func.max(User.score3)).scalar()
    return render_template("highscores.html",score1 = score1,score2 = score2,score3 = score3,score4 = score4)

# This is for command line testing
if __name__ == "__main__":
    app.run(debug=True)
