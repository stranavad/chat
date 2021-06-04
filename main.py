from flask import Flask, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app, cors_allowed_origins='*')
# socketio.set("transports", ['polling', 'websocket'])
rooms = dict()

@socketio.on('message')
def send_message(data):
	print(data)
	send(f"{data['username']}: {data['message']}", to=data['room'], broadcast=True)


@socketio.on("user_connect")
def user_connect(data):
	global rooms
	print(data)
	print(f"Room: {data['room']}. Username: {data['username']}. Password: {data['password']}. Sid: {request.sid}")
	if data['room'] in rooms:
		if data['password'] == rooms[data['room']]['password']:
			if data['username'] not in list(rooms[data['room']]['members'].keys()):  # keys replace
				# Member can join the room
				join_room(data['room'])
				rooms[data['room']]['members'][data['username']] = request.sid
				send(f"{data['username']} has connected.", to=data['room'], broadcast=True)
				emit("room_connect", {"username": data["username"], "room": data["room"], "room_password": data["password"], "members": list(rooms[data["room"]]["members"].keys())})
				emit("edit_members", {"members": list(rooms[data["room"]]["members"].keys())}, to=data["room"], broadcast=True)
				# emit("status_message", "ok")
			else:
				# This username is already in this group
				emit("status_message", "This username already exists in this room")
		else:
			# Wrong room password
			emit("status_message", "Wrong room password")
	else:
		# Room doesn't exist
		emit("status_message", "This room doesn't exist")

@socketio.on("disconnect_user")
def disconnect_user(data):
	global rooms
	rooms[data['room']]['members'].pop(data['username'])
	if not rooms[data['room']]['members']:
		rooms.pop(data['room'])
	leave_room(data['room'])
	emit("edit_members", {"members": list(rooms[data['room']]['members'].keys())}, to=data['room'], broadcast=True)




@socketio.on("create_room")
def create_room(data):
	print(f"create room data: {data}")
	print(f"Type of data: {type(data)}")

	global rooms
	if data['room'] not in rooms:
		# Room doesn't exist, room can be created
		rooms[data['room']] = {"members":{data['username']: request.sid},
							  	"password": data['password']}
		join_room(data['room'])
		send(f"{data['username']} has created room: {data['room']}", to=data['room'], broadcast=True)
		rooms_room = rooms[data["room"]]["members"]
		# print(f"Type of dict_keys: {type(rooms_room.keys())}")
		# print(f"Dict keys: {list(rooms_room.keys())}")
		emit("room_connect", {"username": data["username"], "room": data["room"], "room_password": data["password"], "members": list(rooms[data["room"]]["members"].keys())}, to=data['room'])
	else:
		emit("status_message", "This room already exists")
	print(rooms)



if __name__ == '__main__':
	socketio.run(app)

# To FE return members as a list without request.sid-s
