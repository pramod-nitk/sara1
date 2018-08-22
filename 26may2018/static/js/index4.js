$(document).ready(function(){
		var t0 = new Date();
		$.get("static/big2.txt", null, function (data, textStatus) {
			var t1 = new Date();
		
			var lines = data.split("\n");
			var count = lines.length;
			lines.forEach(function (line) {
				//setTimeout(function () {
					speller.train(line);
					count--;
					if (count == 0) {
						var t2 = new Date();
					
	
					}
				//}, 0);
			});
		}, "text");
	
	
});

