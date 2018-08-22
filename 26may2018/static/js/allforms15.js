function get_val()
{
	var tb = document.getElementById("buttonyesno").value
	send("me",tb);
	serve(tb)
   
}

function get_val1(tb,d_id)
	{
		
	//alert(tb)
    serve(tb)
	document.getElementById(d_id).style.display="none"
  }

function serve(tb)
{
	
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
		if(data["rp_val"].includes("answer only limited queries")){
			send("BOT",data["rp_val"])
			include_html('startpage14.html');}
		 else if(data["rp_val"].includes("yes/no")){
			send("BOT",data["rp_val"])
			include_html('yes_no8.html');}
		else if(data["rp_val"].search("enter the new credit limit") != -1){
		  console.log("i am in slider")
			send("BOT",data["rp_val"])
			include_html('slider2.html');}
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
	