'use strict'

//vote count
let votes = 25;
//picture array
let pics = [];

//three random images
let container = document.getElementById('container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

//results
let showResults = document.getElementById('show-results');
let results = document.getElementById('results-list');

//constructor 
function Pics(name, fileExtension = 'jpg'){
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.count = 0;
  this.views = 0;

  pics.push(this);
}

//pictures
new Pics('bag');
new Pics('banana');
new Pics('bathroom');
new Pics('boots');
new Pics('breakfast');
new Pics('bubblegum');
new Pics('chair');
new Pics('cthulhu');
new Pics('dog-duck');
new Pics('dragon');
new Pics('pen');
new Pics('pet-sweep');
new Pics('scissors');
new Pics('shark');
new Pics('sweep', 'png');
new Pics('tauntaun');
new Pics('unicorn');
new Pics('water-can');
new Pics('wine-glass');

//randomize images
function random(){
  return Math.floor(Math.random()*pics.length);
}

//render
function render(){
  let productOne = random();
  let productTwo = random();
  let productThree = random();

  //imgOne != imgTwo != imgThree
  while(productOne === productTwo || productOne === productThree || productTwo === productThree){
    productTwo = random();
    productThree = random();
  }

  imgOne.src = pics[productOne].img;
  imgOne.alt = pics[productOne].name;
  pics[productOne].views++;

  imgTwo.src = pics[productTwo].img;
  imgTwo.alt = pics[productTwo].name;
  pics[productTwo].views++;

  imgThree.src = pics[productThree].img;
  imgThree.alt = pics[productThree].name;
  pics[productThree].views++;
}

render();

//event handler
function handleClick(event){
  votes--;

  let clickedImg = event.target.alt;

  for(let i = 0; i < pics.length; i++){
    if(clickedImg === pics[i].name){
      pics[i].count++;
    }
  }
  render();
  //handleShowResults();

  if(votes === 0){
    container.removeEventListener('click', handleClick);
  }

}

//li element
function handleShowResults(){
  if(votes === 0){
    for(let i = 0; i < pics.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${pics[i].name} was viewed ${pics[i].views} times and voted ${pics[i].count} times.`
      results.appendChild(liElem);
    }  
  }
}

container.addEventListener('click', handleClick);
showResults.addEventListener('click', handleShowResults);





