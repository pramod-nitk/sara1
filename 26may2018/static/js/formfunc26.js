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
		queue.push(data["rp_val"])
		var words = queue.shift().split(".");
		res = words.filter(word => word.trim().length >= 1);

		console.log(res)
		if(isNaN(data['attrs']['form']))
		{
		   
		   console.log(data['attrs']['form'])
		   if(res.length%2==0)
		   {
		   
			for(i=0; i<res.length;i=i+2)
			{
			//alert("isNaN(data['attrs']['form'] i am in even call")
			if(res[i]!="" && res[i+1]!="")
			{
			
				    send_before_res("BOT",res[i]+". "+res[i+1]+".",i+1)
						
		   }
		   }
		   }
		   else
		   {
		   for(i=0; i<res.length-1;i=i+2)
		   {
			if(res[i]!="" && res[i+1]!="")
			{
			
									send_before_res("BOT",res[i]+". "+res[i+1]+".",i+1)

			}
			
			}
			 send_before_res("BOT",res[i]+".",i+1)

			}
			
			setTimeout(function(){
			include_html(data['attrs']['form']+'.html');
			attrs=data["attrs"]
			attrs['form']=""
			last_attempt=data["last_attempt"]
			last_type=data["last_type"]
			last_intent=data["last_intent"]
			prev_valid=data["prev_valid"]
			},1300*(i+1))
			}
		else
		{
		    
			console.log(res)
			if(res.length%2==0)
		   {
			for(i=0; i<res.length;i=i+2)
			if(res[i]!="" && res[i+1]!="")
			{
			
					
				    send_before_res("BOT",res[i]+". "+res[i+1]+".",i+1)
				
			}
		   }
		   else
		   {
		   for(i=0; i<res.length-1;i=i+2)
		   {
			if(res[i]!="" && res[i+1]!="")
			{
			

					
					
				    send_before_res("BOT",res[i]+". "+res[i+1]+".",i+1)
					
				
			}
			}
			
			send_before_res("BOT",res[i]+".",i+1)
			
			}
			console.log("i am in page")
			attrs=data["attrs"]
			last_attempt=data["last_attempt"]
			last_type=data["last_type"]
			last_intent=data["last_intent"]
			prev_valid=data["prev_valid"]
		}
		$("#load").empty();
		
		}
	});
}
	