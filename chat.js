var SELECTED_CONTACT = ''
var MY_CODE = 'sandslash'		 // debug placeholder
var MY_PASSWORD = '6Mf7smuP' // debug placeholder

function switch_contact(friend_code) {
	SELECTED_CONTACT = friend_code
	get_messages(friend_code)
}

function refresh_message_list() {
	setInterval(get_messages(SELECTED_CONTACT), 6000)
}

function add_emoji(emoji) {
	var new_message = document.querySelector('#message_preview')
	var contents = Array.from(new_message.innerHTML)
	if (contents.length < 7) {
		new_message.innerHTML += emoji
	}
}

function delete_emoji() {
	var new_message = document.querySelector('#message_preview')
	new_message.innerHTML = Array.from(new_message.innerHTML).slice(0, -1).join("")
	if (Notification.permission == 'granted') {
		notify('Delete', 'Message deleted')
	}
}

function send_message() {
	var new_message = document.querySelector('#message_preview')
	if (new_message.innerHTML != '') {
		post_message(new_message.innerHTML)
		new_message.innerHTML = ''
		get_messages(SELECTED_CONTACT)
	}
}

function get_messages(friend_code) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE) { 
			if (xmlhttp.status == 200) {
				response = JSON.parse(xmlhttp.responseText)
				console.log(response)
				if (response['success']) {
					var chat_history = document.querySelector('#history')
					var messages = ''
					for (var i = 0; i < response['data'].length; i++) {
						if (response['data'][i]['sender'] == friend_code) {
							var message_class = 'them'
						} else {
							var message_class = 'me'
						}
						messages = messages + '<span class="message ' + message_class + '">' + response['data'][i]['message'] + '</span>'
					}
					chat_history.innerHTML = messages
				} // /response['sucess']
			}
		}
	}
	xmlhttp.open("POST", "https://www.gareth-murden.com/pkmn/receive/" + friend_code, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json')
	xmlhttp.send(JSON.stringify({'my_code':MY_CODE, 'password':MY_PASSWORD}));

	/*Notification.requestPermission().then((result) => {
	    if (result === "granted") {
	      notify('Notifications enabled', 'You will now receive notifications when new messages arrive.');
	    }
	})*/
}

function post_message(message) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "https://www.gareth-murden.com/pkmn/send/" + SELECTED_CONTACT, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json')
	xmlhttp.send(JSON.stringify({'my_code':MY_CODE, 'message':message}));
}

function notify(title, body) {
	const options = {
	    body: body,
	    icon: '/icon/android-launchericon-48-48.png',
	};
	new Notification(title, options);
}

/*const button = document.getElementById("notifications");
button.addEventListener("click", () => {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      randomNotification();
    }
  });
});
*/