<script type="text/javascript" src="jquery.loading.min.js"></script>
<script type="text/javascript" src="speller.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$("#correct").click(function(event) {
		$.loading(true, { text: 'Working...', pulse: 'fade'});
		var word = $('#word')[0].value;
		setTimeout(function () {
			print(speller.correct(word));
			$.loading(false, { text: 'Working...', pulse: 'fade'});
		}, 0);
	});
	$("#train").click(function(event) {
		$.loading(true, { text: 'Working...', pulse: 'fade'});
		var t0 = new Date();
		$.get("big.txt", null, function (data, textStatus) {
			var t1 = new Date();
			print("Loaded file in " + (t1 - t0) + " msec");
			var lines = data.split("\n");
			var count = lines.length;
			lines.forEach(function (line) {
				setTimeout(function () {
					speller.train(line);
					count--;
					if (count == 0) {
						var t2 = new Date();
						print("Trained in " + (t2 - t1) + " msec");
						$.loading(false, { text: 'Working...', pulse: 'fade'});
					}
				}, 0);
			});
		}, "text");
	});
	var work = function(event) {
		$.loading(true, { text: 'Working...', pulse: 'fade'});
		var worker = new Worker("worker.js");
		worker.onmessage = function (e) {
			print(e.data);
			$.loading(false, { text: 'Working...', pulse: 'fade'});
		};
		worker.postMessage(this.id + "@" + JSON.stringify(speller.nWords));
	};
	$("#tests1").click(work);
	$("#tests2").click(work);
});

print = function(str) {
	var old = $("#result > pre")[0].innerHTML;
	$("#result > pre")[0].innerHTML = old + "<br>" + str;
};
</script>