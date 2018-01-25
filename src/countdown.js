const countdownModule = (function() {
	const clock = document.querySelector('.clock');
	const repeatButton = document.querySelector('.repeat');
	
	function countdown() {
		const countdownStart = 5;

		for (var i = countdownStart; i > -1; i--) {
			// Use an IIFE to create function scope and pass the current value of i as a param.  
			// Not really exercising closure since the IIFE is executed in the same scope
			// where it was defined.
			(function(i) {
				setTimeout(() => {
					clock.innerHTML = `<div class="digit">${i}</div>`;
					if (i === 0) {
						repeatButton.disabled = false;
					} else {
						repeatButton.disabled = true;
					}
				}, ((countdownStart * 1000) - (i * 1000)));
			})(i);
		}
	}

	function init() {
		// console.log(this); // the returned object ({ init: fn })
		repeatButton.addEventListener('click', countdown);
		countdown();
	}

	return {
		init,
	};
})();

// closure IS observed here 
window.onload = function() {
	// console.log(this); // The global scope (Window)
	countdownModule.init();
};
// closure occurs when a function is called outside of its lexical scope
// but still has access to its lexical scope (see JS Scopes & Closures by 
// Kyle Simpson).
// when countdownModule was declared an IIFE returned a reference to the 
// init function that was defined inside the IFFE's scope.
// when the window.onload callback fires, it executes the init function
// in the global scope (which is different from the lexical scope
// where the init function was defined).  that IIFE's scope should have
// been garbage collected since it was executed already,
// but init still is able to access its lexical scope and get the
// repeatButton because it "closes over" the IIFE's scope.
