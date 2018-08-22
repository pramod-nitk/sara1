



try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var notesList = $('ul#notes');

var noteContent = '';




/*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = true;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {

  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    var tb = transcript;
	//alert(tb)
	//document.getElementById("btn-input").value=''
	if(tb.trim()!='')
	{
	send("me",tb);
    var val = "hi";
    var entry1 = tb;

  var requestBody={text:tb,"last_type":last_type,"last_intent":last_intent,"last_attempt":last_attempt,"attrs":attrs,"prev_valid":prev_valid}
  console.log(requestBody)
	
	$.ajax({
	url:"/getData",
	type:"post",
	data:JSON.stringify(requestBody),
	dataType:"json",
	contentType:"application/json",
	success: function(data){
		console.log(data)
		console.log("i am in page")
			send("BOT",data["rp_val"])
			console.log("i am in page")
			attrs=data["attrs"]
			last_attempt=data["last_attempt"]
			last_type=data["last_type"]
			last_intent=data["last_intent"]
			prev_valid=data["prev_valid"]
		}
	});
}

  }
};

recognition.onstart = function() { 
  instructions.text('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');  
  };
}



/*-----------------------------
      App buttons and input 
------------------------------*/

$('#start-record-btn').on('click', function(e) {
$('#start-record-btn').hide();
$('#pause-record-btn').show();

  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});
$('#pause-record-btn').on('click', function(e) {

$('#pause-record-btn').hide();
$('#start-record-btn').show();

  recognition.stop();
  instructions.text('Voice recognition paused.');
});







/*-----------------------------
      Speech Synthesis 
------------------------------*/

function readOutLoud(message) {
	var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
	speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;
  
	window.speechSynthesis.speak(speech);
}





