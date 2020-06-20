(() => {
	// set up the puzzle pieces and boards

	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				puzzlePieces = document.querySelectorAll('.puzzle-pieces img'),
				dropZones = document.querySelectorAll('.drop-zone'),
				gameBoard = document.querySelector('.puzzle-board'),
				dragZone = document.querySelector('.puzzle-pieces');
	const pieceName =["topLeft", "topRight", "bottomLeft", "bottomRight"];

	function changeImageSet () {
		//change all the image elements on the page -> draggable image sources,

		//change the image elements on the left to match the selected puzzle
		pieceName.forEach((piece, index) => {
		puzzlePieces[index].src = `images/${piece + this.dataset.puzzleref}.jpg` ;
		puzzlePieces[index].id =`${piece + this.dataset.puzzleref}`;
		//set attribute so that later we can compare it with a drop zone attribute
		//to see if the puzzle has the right location 
		puzzlePieces[index].setAttribute('data-position', piece);

	});

		resetPuzzlePieces();
		//and set the drop zone background image on the puzzle the user selects
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleref}.jpg)`;
		//debugger;
	}

	function resetPuzzlePieces(){	
		//set the original parent for puzzle pieces	
		for(let i=0; i < puzzlePieces.length; i++){	
		dragZone.appendChild(puzzlePieces[i]);	
	    }
	}

	function allowDrag(event) {
		console.log('started draggin an image');

		event.dataTransfer.setData("text/plain", this.id);
	}
	function allowDragOver(event) {
		event.preventDefault();
		console.log('dragged over a drop zone');
	}
	function allowDrop(event) {

		let currentImage = event.dataTransfer.getData("text/plain");
		let droppingImage = document.querySelector(`#${currentImage}`);

		if(this.childNodes.length === 0) {
		this.appendChild(droppingImage);
	}
		else {
			isAllFull();
			if (isFull === 4){
			console.log(isFull);
			droppingImage.parentElement.append(this.firstChild);
			this.appendChild(droppingImage);
	}
	        if (this.childNodes.length === 1) {
	        	//place the puzzle piece if the dropzone is empty
			for (let i=0; i < 4; i++){
				if (dropZones[i].childNodes.length == 0) {
					dropZones[i].append(this.firstChild);
					i = 5;
				}
			}
			//add dropping image to the drop zone
			this.appendChild(droppingImage);

}
	
	}
	console.log('dropped on a drop zone');
	isFinished();


	}
	function isAllFull() { 
		//check if all puzzle pieces are on the puzzle board
		isFull = 0;
		dropZones.forEach(zone => {
			if (zone.childNodes.length > 0){
				isFull += 1;
			}
		});
	}
	function isFinished(){
	let p = 0;
	isAllFull();
	if (isFull === 4){
		dropZones.forEach(zone => {
			if(zone.dataset.position === zone.firstChild.dataset.position){
			p += 1;
			}
		});
	}
	// when the puzzle is succesfully done it shows a popup on the browser with a congratulation message
	if (p == 4){
		alert('Congratulations!You succesfully solved the puzzle');
	}

	
}
	//add event handling here
	//click on the bottom buttons to change the puzzle image we're woking with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));


	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));


	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});

// research call, will apply the new image for the puzzle and reset it
	changeImageSet.call(puzzleButtons[0]);
})();
