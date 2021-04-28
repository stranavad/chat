from flask import Flask, request
from flask_socketio import SocketIO, send, emit, join_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app, cors_allowed_origins='*')
rooms = dict()

@socketio.on('message')
def send_message(data):
	send(f"{data['username']}: {data["message"]}", to=data['room'], broadcast=True)


@socketio.on("user_connect")
def user_connect(data):
	global rooms
    print(f"Room: {data['room']}. Username: {data['username']}. Password: {data['password']}. Sid: {request.sid}")
	if data['room'] in rooms:
		if data['password'] == rooms[room]['password']:
			if data['username'] not in rooms[room]['members'].keys():
				# Member can join the room
				join_room(room)
				rooms[room]['members'].append({username: request.sid})
				send(f"{username} has connected.", to=data['room'], broadcast=True)
				emit("status_message", "ok")
			else:
				# This username is already in this group
				emit("status_message", "This username already exists in this room")
		else:
			# Wrong room password
			emit("status_message", "Wrong room password")
	else:
		# Room doesn't exist
		emit("status_message", "This room doesn't exist")


@socketio.on("create_room")
def create_room(data):
	global rooms
	if data['room'] not in rooms:
		# Room doesn't exist, room can be created
		rooms[data['room']] = {members:[{data['username']: request.sid}],
							  	password: data['password']}
		join_room(data['room'])
		send(f"{data['username']} has created room: {data['room']}", to=data['room'], broadcast=True)
	else:
		emit("status_message", "This room already exists")



if __name__ == '__main__':
	socketio.run(app)
