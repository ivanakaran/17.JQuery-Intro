$(function () {

	//write your code here
	let raceBtn = $('#raceBtn');
	let startOverBtn = $('#startOverBtn');
	raceBtn.on('click', function (e) {
		e.preventDefault();
		//Change opacity on timer
		$(".raceTrack").animate({
			opacity: "0.5"
		}, 100).delay(3000).animate({
			opacity: "1"
		}, 100);
		//Disable buttons till the game is finished
		raceBtn.attr('disabled', 'true');
		startOverBtn.attr('disabled', 'true');
		//Set timer
		let count = 3;
		$('.counter').show();
		$(".counter").text(count);

		function counting() {
			if (count > 1) {
				count--;
				$(".counter").text(count);
			} else {
				$(".counter").text('');
				clearInterval(timer);
			}
		};

		let timer = setInterval(function () {
			counting();
			if (count < 1) {
				clearInterval(timer);
			}
		}, 1000);

		//get the width of the car and the race track
		let carWidth = $('#carOne').width()
		let raceTrackWidth = $(window).width() - carWidth;

		//generate a random number for the race time
		let raceTimeOne = Math.floor((Math.random() * 5000) + 1);
		let raceTimeTwo = Math.floor((Math.random() * 5000) + 1);

		//Set the completion to false by default
		let isFinished = false
		//Set a variable to see which car is first place
		let place = 'first';
		function isComplete() {
			if (isFinished === false) {
				isFinished = true;
				$('.flag').css('display', 'block');
				$(".raceTrack").css('opacity', "0.5");
				startOverBtn.removeAttr('disabled');
			} else {
				place = 'second'
			}
		}

		//Move the cars and set the web storage
		$('#carOne').delay(3000).animate({
			left: raceTrackWidth
		}, raceTimeOne, function () {
			isComplete();
			$('.leftColumn').append(`<div class="car-left">Finished in: <span class="colorPink font-weight-bold">${place}</span> place with a time of: <span class="colorPink font-weight-bold">${raceTimeOne}</span> milliseconds</div>`);

			localStorage.setItem('firstCar', `<div class="car-left"><span class="colorPink font-weight-bold">Car1</span> finished in <span class="colorPink font-weight-bold">${place}</span>, with a time of <span class="colorPink font-weight-bold">${raceTimeOne}</span> milliseconds!</div>`);
		})

		$('#carTwo').delay(3000).animate({
			left: raceTrackWidth
		}, raceTimeTwo, function () {
			isComplete();
			$('.rightColumn').append(`<div class="car-left">Finished in: <span class="colorRed font-weight-bold">${place}</span> place with a time of: <span class="colorRed font-weight-bold">${raceTimeTwo}</span> milliseconds</div>`);

			localStorage.setItem('secondCar', `<div class="car-right"><span class="colorRed font-weight-bold">Car2</span> finished in <span class="colorRed font-weight-bold">${place}</span>, with a time of <span class="colorRed font-weight-bold">${raceTimeTwo}</span> milliseconds!</div>`);
		})
	})


	//star over button functionalities
	startOverBtn.on('click', function (e) {
		e.preventDefault();
		raceBtn.removeAttr('disabled');
		$('.flag').css('display', 'none');
		$('.raceTrack').css('opacity', '1');
		$('#carOne').css('left', '0');
		$('#carTwo').css('left', '0');
	})


	//display the web storage from the previous game 
	let firstCarStorage = localStorage.getItem('firstCar');
	let secondCarStorage = localStorage.getItem('secondCar');

	if (firstCarStorage || secondCarStorage) {
		$('.storageResults').append(`<h3>Results from the previous time you played this game:</h3>`);
		$('.storageResults').append(firstCarStorage);
		$('.storageResults').append(secondCarStorage);
	};


	localStorage.clear();
});