from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """ User model """
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(25),unique=True,nullable=False)
    password = db.Column(db.String(),nullable=False)
    score1 = db.Column(db.Integer,nullable=True)#duck hunt score
    score2 = db.Column(db.Integer,nullable=True)#snake score
    score3 = db.Column(db.Integer,nullable=True)#asteroids score
    score4 = db.Column(db.Integer,nullable=True)#space invaders high score
