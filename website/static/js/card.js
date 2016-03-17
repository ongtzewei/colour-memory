function Card(value) {
	this.value = value;
	this.hidden = true;
	this.matched = false;
	this.sound = new Audio("/static/audio/card-flip.mp3");
}
Card.prototype = {
	
	flip: function() {
		if(this.matched) return;
		this.hidden = !this.hidden;
		this.sound.play();
	},
	
	matches: function(card) {
		return this.value==card.value;
	},
	
	matchFound: function() {
		this.matched = true;
	}
	
};
