var SELECTED_CONTACT = ''
var MY_CODE = ''
var MY_PASSWORD = ''

function startup() {
	console.log('startup()')
	var my_data = localStorage.getItem('my_data')
	if (my_data === null) {
		// New user
		my_data = {
			'friend_code':generate_id(),
			'password':generate_id()
		}
		localStorage.setItem('my_data', JSON.stringify(my_data))
	} else {
		// Returning user
		my_data = JSON.parse(my_data)
	}
	MY_CODE = my_data['friend_code']
	MY_PASSWORD = my_data['password']
	console.log('my_code = ' + MY_CODE + ', my_password = ' + MY_PASSWORD) // debug
}

function generate_id() {
	//https://stackoverflow.com/a/1349426/12825882
	length = 6
  let result = '';
  const characters = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

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
						messages = messages + '<span class="message snes-container ' + message_class + '">' + response['data'][i]['message'] + '</span>'
					}
					chat_history.innerHTML = messages
				} // /response['sucess']
			}
		}
	}
	xmlhttp.open("POST", "https://www.gareth-murden.com/pkmn/receive/" + friend_code, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json')
	xmlhttp.send(JSON.stringify({'my_code':MY_CODE, 'password':MY_PASSWORD}));
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

function load_emoji(category) {
	categories = [
		'body',
		'geography',
		'animals',
		'food',
		'technology'
	]
	for (var i = 0; i < categories.length; i++) {
		document.querySelector('#category_' + categories[i]).classList.remove('selected')
	}
	document.querySelector('#category_' + category).classList.add('selected')
	var emoji = {
		'body':[
			'😀',
			'😁',
			'😂',
			'🤣',
			'😃',
			'😄',
			'😅',
			'😆',
			'😉',
			'😊',
			'😇',
			'🥰',
			'😍',
			'🤩',
			'😘',
			'😗',
			'😙',
			'😚',
			'😋',
			'😛',
			'😜',
			'😝',
			'😒',
			'😔',
			'😕',
			'😖',
			'😞',
			'😟',
			'😤',
			'😠',
			'😡',
			'😶',
			'😏',
			'😣',
			'😥',
			'😮',
			'😯',
			'😲',
			'😳',
			'🥺',
			'😵',
			'😱',
			'😨',
			'😰',
			'😢',
			'😥',
			'😓',
			'😩',
			'😪',
			'😷',
			'🤒',
			'🤕',
			'🤢',
			'🤮',
			'🤧',
			'😇',
			'🥳',
			'👋',
			'🤚',
			'🖐️',
			'✋',
			'🖖',
			'👌',
			'🤏',
			'✌️',
			'🤞',
			'🤟',
			'🤘',
			'🤙',
			'👈',
			'👉',
			'👆',
			'🖕',
			'👇',
			'☝️',
			'👍',
			'👎',
			'✊',
			'👊',
			'🤛',
			'🤜',
			'👏',
			'🙌',
			'👐',
			'🤲',
			'🤝',
			'🙏',
			'✍️',
			'💅',
			'👂',
			'👃',
			'🧠',
			'👀',
			'👁️',
			'👅',
			'👄',
			'💋',

			'⛷️',
			'🏂',
			'🏌️',
			'🏋️',
			'🤼',
			'🤸',
			'⛸️',
			'🏇',
			'🚴',
			'🚵',
			'🏍️',
			'🏎️',
			'🏁',
			'⛳',
			'🏊',
			'🤽',
			'🤾',
			'🏄',
			'🚣',
			'🛶',
			'🏏',
			'🥋',
			'⚽',
			'🏀',
			'🏈',
			'⚾',
			'🎾',
			'🏐',
			'🏉',
			'🥏',
			'🏓',
			'🏸',
			'🥇',
			'🥈',
			'🥉',
			'🏆',
			'🏅'
		],
		'geography':[
			'☀️',
			'🌤️',
	    '🌥️',
	    '☁️',
	    '🌦️',
	    '🌧️',
	    '🌩️',
	    '🌨️',
	    '🌪️',
	    '🌫️',
	    '🌡️',
			'✨',
			'🌟',
			'⭐',
			'⚡',
			'💧',
			'🍀',
			'☘️',
			'🌙',
			'💦',
			'💧',
			'🌊',
			'🌈',
			'🔥',
			'☄️',
			'🌪️',
			'🌍',
			'🌎',
			'🌏',
			'🌳',
	    '🌲',
	    '🌴',
	    '🌵',
	    '🌻',
	    '🌼',
	    '🌸',
	    '🍀',
	    '🍃',
	    '🌿',
	    '🌾',
	    '🌌',
	    '🍂',
	    '🌋',
			'🏠',
			'🏡',
			'🏢',
			'🏣',
			'🏤',
			'🏥',
			'🏦',
			'🏨',
			'🏩',
			'🏪',
			'🏫',
			'🏬',
			'🏭',
			'🏯',
			'🏰',
			'🗼',
			'🗽',
			'⛪',
			'🕌',
			'🕍',
			'🕋',
			'⛩️',
			'🗿',
			'🏛️'
		],
		'animals':[
			'🐶',
			'🐱',
			'🐭',
			'🐹',
			'🐰',
			'🦊',
			'🐻',
			'🐼',
			'🐨',
			'🐯',
			'🦁',
			'🐮',
			'🐷',
			'🐸',
			'🐵',
			'🙈',
			'🙉',
			'🙊',
			'🐔',
			'🐧',
			'🐦',
			'🐤',
			'🦅',
			'🦉',
			'🦇',
			'🐺',
			'🐗',
			'🐴',
			'🦄',
			'🐝',
			'🐛',
			'🐌',
			'🦋',
			'🐞',
			'🐜',
			'🦗',
			'🦠',
			'🐠',
			'🐟',
			'🐡',
			'🦈',
			'🐬',
			'🐳',
			'🐋',
			'🐊',
			'🐍',
			'🦎',
			'🐢',
			'🐙',
			'🦑',
			'🐚',
			'🐋',
			'🦙',
			'🦒',
			'🐘',
			'🦏',
			'🐪',
			'🐫',
			'🦙',
			'🐅',
			'🐆',
			'🦓'
		],
		'food':[
			'🍏',
			'🍎',
			'🍐',
			'🍊',
			'🍋',
			'🍌',
			'🍉',
			'🍇',
			'🍓',
			'🍈',
			'🍒',
			'🍑',
			'🥭',
			'🍍',
			'🥥',
			'🥝',
			'🍅',
			'🥑',
			'🥕',
			'🌽',
			'🥔',
			'🍠',
			'🧄',
			'🧅',
			'🥬',
			'🥦',
			'🍄',
			'🌶️',
			'🌿',
			'🥗',
			'🍽️',
			'🍕',
			'🍔',
			'🍟',
			'🌭',
			'🥪',
			'🌮',
			'🌯',
			'🍣',
			'🍱',
			'🍜',
			'🍲',
			'🍛',
			'🍚',
			'🍙',
			'🥘',
			'🍥',
			'🍦',
			'🍧',
			'🍨',
			'🍩',
			'🍪',
			'🎂',
			'🍰',
			'🧁',
			'🍫',
			'🍬',
			'🍭',
			'🍮',
			'🍯',
			'🥛',
			'☕',
			'🍵'
		],
		'technology':[
			'🛣️',
			'🛳️',
			'🚢',
			'✈️',
			'🚀',
			'🚁',
			'🚂',
			'🚊',
			'🚉',
			'🚞',
			'🚍',
			'🚘',
			'🚖',
			'🚗',
			'🚌',
			'🚲',
			'🛴',
			'🛵',
			'🚏',
			'🚦',
			'🚧',
			'⚓',
			'⛵',
			'🛥️',
			'🚤',
			'🛩️',
			'🛬',
			'🌐',
			'💻',
			'📱',
			'🖥️',
			'⌨️',
			'🖱️',
			'🖲️',
			'🖨️',
			'📡',
			'🔌',
			'🔋',
			'💾',
			'🗄️',
			'🗂️',
			'📊',
			'📈',
			'📉',
			'🧬',
			'🔍',
			'🔭',
			'🛰️',
			'💡',
			'🧠',
			'🤖',
			'🕹️',
			'🎮',
			'📺',
			'🎥',
			'📷',
			'🔊',
			'🎤',
			'🎧',
			'🖥️',
			'🧩',
			'🔒',
			'🔑',
			'🗝️',
			'🛡️',
			'⚙️',
			'🔧',
			'🔨',
			'🧰',
			'🧪',
			'🧬',
			'🌐',
			'💻',
			'🖥️',
			'📡',
			'🖱️',
			'🔌',
			'🔋',
			'🗄️',
			'🗂️',
			'📊',
			'📈',
			'📉',
			'🔍',
			'🔭',
			'🛰️',
			'💡',
			'🧠',
			'🕹️',
			'🎮',
			'⚽',
			'🏀',
			'🏈',
			'🎾',
			'🎳',
			'🎯',
			'🔔',
			'🔕',
			'⚓',
			'⏳',
			'⌛',
			'🔒',
			'🔑',
			'🔗',
			'🧩',
			'⚙️',
			'🔧',
			'🔨',
			'🛠️',
			'🧭',
			'📏',
			'📐',
			'✏️',
			'🖊️',
			'🖋️',
			'💘',
			'💖',
			'💗',
			'💓',
			'💞',
			'💕',
			'💌',
			'💔',
			'❤️',
			'🧡',
			'💛',
			'💚',
			'💙',
			'💜',
			'🤎',
			'🖤',
			'🤍',
			'💯',
			'💢',
			'💥',
			'💫',
			'➕',
			'➖',
			'➗',
			'✖️',
			'❓',
			'❔',
			'❗',
			'❕',
			'❗️'
		],
	}

	var emoji_list = ''
	for (var i = 0; i < emoji[category].length; i++) {
		emoji_list += '<span class="emoji" onclick="add_emoji(\'' + emoji[category][i] + '\')">' + emoji[category][i] + '</span>' //```<span class="emoji" onclick="add_emoji('``` + emoji[category][i] + ```')">``` + emoji[category][i] + ```</span>```
	}
	document.querySelector('#emoji_list').innerHTML = emoji_list
}