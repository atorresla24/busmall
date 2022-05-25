'use strict'

//vote count
let votes = 25;
//picture array
let pics = [];
//uniqueCount = 6;

//three random images
let container = document.getElementById('container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

//results
let showResults = document.getElementById('show-results');
let results = document.getElementById('results-list');

let ctx = document.getElementById('chart').getContext('2d');

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


//let counter = 0;
let checkArr = [];

//randomize images
function random(){
  return Math.floor(Math.random()*pics.length);
}

//render
function render(){
  //let productOne = random();
  //let productTwo = random();
  //let productThree = random();
  
  //imgOne != imgTwo != imgThree
  //while(productOne === productTwo || productOne === productThree || productTwo === productThree){
    //productTwo = random();
    //productThree = random();
  //}

  while(checkArr.length < 6){
    let num = random();
    if(!checkArr.includes(num)){
      checkArr.push(num);
    }
  }

  let productOne = checkArr.shift();
  let productTwo = checkArr.shift();
  let productThree = checkArr.shift();

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

// Chart render
function chartRender(){
  let picsNames = [];
  let picsVotes = [];
  let picsViews = [];

  for (let i = 0; i < pics.length; i++){
    picsNames.push(pics[i].name);
    picsVotes.push(pics[i].count);
    picsViews.push(pics[i].views);
  }

  let myChartObj = {
    type: 'bar',
    data: {
      labels: picsNames,
      datasets: [{
        label: '# of Votes',
        data: picsVotes,
        backgroundColor: [
          '#ff7300',
          '#fffb00',
          '#48ff00',
          '#00ffd5',
          '#002bff',
          '#7a00ff',
          '#ff00c8',
          '#ff0000'
        ],
        borderColor: [
          '#ff7300',
          '#fffb00',
          '#48ff00',
          '#00ffd5',
          '#002bff',
          '#7a00ff',
          '#ff00c8',
          '#ff0000'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: picsViews,
        backgroundColor: [
          '#ff0000',
          '#ff7300',
          '#fffb00',
          '#48ff00',
          '#00ffd5',
          '#002bff',
          '#7a00ff',
          '#ff00c8',
          '#ff0000'
        ],
        borderColor: [
          '#ff0000',
          '#ff7300',
          '#fffb00',
          '#48ff00',
          '#00ffd5',
          '#002bff',
          '#7a00ff',
          '#ff00c8',
          '#ff0000'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx, myChartObj);

}

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
    chartRender();
    showResults.removeEventListener('click', handleShowResults);  
  }
}

container.addEventListener('click', handleClick);
showResults.addEventListener('click', handleShowResults);







