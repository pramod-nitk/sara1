

function get_val1(tb)
	{
		
	//alert(tb)
    serve(tb)
  }

function serve(tb)
{
	
	 var val = "hi";
    var entry1 = tb;

  var requestBody={text:tb,"last_type":last_type,"last_intent":last_intent,"last_attempt":last_attempt,"attrs":attrs,"prev_valid":prev_valid}
  console.log(requestBody)
	
	$.ajax({
	url:"/",
	type:"post",
	data:JSON.stringify(requestBody),
	dataType:"json",
	contentType:"application/json",
	success: function(data){
		console.log(data)
		console.log("i am in page")
   if(data["rp_val"].includes("Hi there")){
		console.log("i m in hi")
			send("BOT",data["rp_val"])
			include_html('start3.html');
      }
   else if(data["rp_val"].includes("yes/no")){
      send("BOT",data["rp_val"])
    	include_html('yes_no3.html');  
      }
   else if(data["rp_val"].includes("What is the issue?")){
      send("BOT",data["rp_val"])
    	include_html('start3.html');  
      }
		else
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
	