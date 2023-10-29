// var url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json';
var url = 'magneticPoetryWordList.txt';
var wordClass = '.word';
var wordTemplate = '<div class="word">{{word}}</div>';
var wordCount = 69;
var $board = $("#board");
var db = null;
var pk = {};

function fetch() {
  
  if(localStorage.pk)
    pk = JSON.parse(localStorage.pk);
  
  db = pk.db ? pk.db : null;
  
  if(db) {
    init(wordCount);
    return;
  }
  
  $.get(url, function(data){
    db = data;
    localStorage.pk = JSON.stringify({ db: db });
    init(wordCount);
  });
  
};

fetch();

function randomRotation() {
  return _.random(0,4) * _.random(-1, 1);
}

function randomX() {
  return _.random(0, $board.width() - 100);
}

function randomY() {
  return _.random(0, $board.height() - 100);
}

function rotate(el) {
  TweenMax.to(el, .3, { rotation: randomRotation });
}

function selectWords(words, count) {
  words = Object.keys(JSON.parse(words));
  var output = '';
  for(var i = 0; i < count; i++) {
    output += wordTemplate.replace(
      '{{word}}', 
      words[_.random(1,words.length-1)]
    );
  }
  pk.words = output;
  localStorage.pk = JSON.stringify(pk);
  return output;
}

function init(count) {

  var selected = pk.words 
                  ? pk.words 
                  : selectWords(db, count);
  
  $board
    .append(selected);
  
  TweenMax.staggerTo(
    wordClass, 
    count/100, 
    { 
      opacity: 1, 
      position: 'relative',
      display: 'inline-block',
      cycle: {
        // left: randomX,
        // top: randomY,
        rotation: randomRotation
      }
    }, 
    .03
  );
  
  Draggable.create(wordClass, {
    type: 'x,y',
    zIndexBoost: true,
    throwProps: true,
    onThrowComplete: function(event) {
      var target = event.target;
      
      if($(target).is(wordClass))
        rotate(target);
    },
    maxDuration: .3,
    bounds: $board
  });
}

$(window).on('resize', function() {
  rotate(wordClass);
});

$("#reset").on('click', function(){
  $('.word', $board).remove();
  localStorage.removeItem('pk');
  pk = {};
  fetch();
});