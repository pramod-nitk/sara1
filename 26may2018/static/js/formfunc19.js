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
	document.getElementById(d_id).remove();
		document.getElementById("btn-input").disabled = false;
	document.getElementById("btn-chat").disabled = false;
  }
  
 function getval2(data_id,div_id)
 {
	 var tb=document.getElementById(data_id).value;
	 serve(tb)
	 	document.getElementById(div_id).remove();
				document.getElementById("btn-input").disabled = false;
		document.getElementById("btn-chat").disabled = false;
	 
 }

function date(date_id)
{
var x =document.getElementById("dte").value.split('-')
serve(x[2]+"-"+x[1]+"-"+x[0])
document.getElementById(date_id).remove();
				document.getElementById("btn-input").disabled = false;
		document.getElementById("btn-chat").disabled = false;
} 

  
function serve(tb)
{
	
	 var val = "hi";
    var entry1 = tb;

  var requestBody={text:tb,"last_type":last_type,"last_intent":last_intent,"last_attempt":last_attempt,"attrs":attrs,"prev_valid":prev_valid}
  console.log(requestBody)
	send("me",tb);
	$.ajax({
	url:"/getData",
	type:"post",
	data:JSON.stringify(requestBody),
	dataType:"json",
	contentType:"application/json",
	success: function(data){
		console.log(data)
		console.log("i am in page")
		/*if(data["rp_val"].includes("answer only limited queries")){
			send("BOT",data["rp_val"])
			include_html('startpage17.html');}
		 else if(data["rp_val"].includes("yes/no")){
			send("BOT",data["rp_val"])
			include_html('yes_no.html');}
		else if(data["rp_val"].search("enter the new credit limit") != -1){
		  console.log("i am in slider")
			send("BOT",data["rp_val"])
			include_html('slider5.html');}
		else if(data["rp_val"].search("date") != -1){
		  console.log("i am in slider")
			send("BOT",data["rp_val"])
			include_html('calendar1.html');}
			*/
			
			if(data['attrs']['form']!=''){
			send("BOT",data["rp_val"]);
			include_html(data['attrs']['form']+'.html');
			attrs=data["attrs"]
			attrs['form']=""
			last_attempt=data["last_attempt"]
			last_type=data["last_type"]
			last_intent=data["last_intent"]
			prev_valid=data["prev_valid"]
			}
		else
		{
			var res = data["rp_val"].split(".");
			for(i=0; i<res.length;i++)
			if(res[i]!="")
			send("BOT",res)
			console.log("i am in page")
			attrs=data["attrs"]
			last_attempt=data["last_attempt"]
			last_type=data["last_type"]
			last_intent=data["last_intent"]
			prev_valid=data["prev_valid"]
		}	
			
		}
	});
}
	