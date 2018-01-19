const countdownModule = (function() {
	const clock = document.querySelector('.clock');
	const repeatButton = document.querySelector('.repeat');
	
	function countdown() {
		const countdownStart = 5;

		for (var i = countdownStart; i > -1; i--) {
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
		repeatButton.addEventListener('click', countdown);
		countdown();
	}

	return {
		init,
	};
})();

window.onload = () => countdownModule.init();
