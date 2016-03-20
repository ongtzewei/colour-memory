function Card(value) {
	this.value = value;
	this.hidden = true;
	this.matched = false;
	this.sound = GAME.AUDIO.CardFlip;
}
Card.prototype = {
	
	flip: function() {
		if(this.matched) return;
		this.hidden = !this.hidden;
		if(GAME.PLAY_SOUND) { this.sound.play(); }
	},
	
	matches: function(card) {
		return this.value==card.value;
	},
	
	matchFound: function() {
		this.matched = true;
	}
	
};
