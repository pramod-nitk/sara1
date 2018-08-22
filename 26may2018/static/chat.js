
	var attrs = {"account_id":"","last_name":"","score":"","card":"","amount":"","date":"","payment":""}
	var last_type=""
	var last_intent=""
	var last_attempt=0
	var prev_valid=0
	$("#chatbox").hide();
	$(document).ready(function () {
    $('#submit').click(function () {
	$("#chatbox, #chatbox").toggle();
	
    });
});
	
	
$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $( "#chatbox" ).hide();
});

// send function start

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function send(type,response1){
console.log("i am in inside send page")
	var chat = $("#btn-input").val(); 
var date = formatAMPM(new Date());
if (type =="BOT") {
    
var body=	'<div class="row msg_container base_receive">'+
                        '<div class="col-md-2 col-xs-2 avatar">'+
                            '<img src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/118/robot-face_1f916.png" class="chatimg img-responsive ">'+
                        '</div>'+
                        '<div class="col-md-10 col-xs-10">'+
                            '<div class="messages msg_receive">'+
                                '<p>'+response1+'</p>'+
                                '<p><small>'+date+'</small></p>' +
                            '</div>'+
                        '</div>'+
                    '</div>'
	
	
} else
{
var body =                       '<div class="row msg_container base_sent">' +
						'<div class="col-md-10 col-xs-10 ">' +
                            '<div class="messages msg_sent">' +
                                '<p>'+ response1 + '</p>'+
                              '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-2 col-xs-2 avatar">' +
                            '<img class="chatimg" src="https://png.icons8.com/metro/1600/businessman.png" class=" img-responsive ">' +
                        '</div>' +
					'</div>';
}
$(body).appendTo("#messagebody");
$('#btn-input').val('');
$("#messagebody").animate({ scrollTop: $("#messagebody")[0].scrollHeight}, 'slow');
}


// send function end




$( "#btn-chat" ).click(function() {
	
	var tb = document.getElementById("btn-input").value;
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




//send()
});

$('#btn-input').keypress(function (e) {
  if (e.which == 13) {
  var tb = document.getElementById("btn-input").value;
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



	//send()
  }
});


