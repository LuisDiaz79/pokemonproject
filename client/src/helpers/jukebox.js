let initializeJukebox = function(){
  return new Promise((resolve, reject) => {
    $( document ).ready(function() {
      soundManager.setup({debugMode: false});   //Disable Debug messages in the console

      let backgroundMusicObject = soundManager.createSound({
        url: "assets/Pokemon_XY_-_Battle.mp3",
        autoLoad: true,
        autoPlay: true,
        loops: 100,
        onload: function() {
          //alert('The sound '+this.id+' loaded!');
        },
      });

      backgroundMusicObject.stop();
      backgroundMusicObject.setVolume(20);

      let hoverSoundObject = soundManager.createSound({
        url: "assets/hover.wav",
        autoLoad: true,
        autoPlay: true,
        onload: function() {
          //alert('The sound '+this.id+' loaded!');
        },
      });

      hoverSoundObject.stop();

      let selectSoundObject = soundManager.createSound({
        url: "assets/Accept.mp3",
        autoLoad: true,
        autoPlay: true,
        onload: function() {
          //alert('The sound '+this.id+' loaded!');
        },
      });

      selectSoundObject.stop();

      let pokeSortHoverSoundObject = soundManager.createSound({
        url: "assets/sort_choice.mp3",
        autoLoad: true,
        autoPlay: true,
        onload: function() {
          //alert('The sound '+this.id+' loaded!');
        },
      });

      pokeSortHoverSoundObject.stop();

      let pokeSortSelectSoundObject = soundManager.createSound({
        url: "assets/sort_select.mp3",
        autoLoad: true,
        autoPlay: true,
        onload: function() {
          //alert('The sound '+this.id+' loaded!');
        },
      });

      pokeSortSelectSoundObject.stop();

      let play = function(choice, soundCollection){
        if(choice === 'backgroundMusic')
          soundCollection.backgroundMusicObject.play();
        else if(choice === 'hoverSound')
          soundCollection.hoverSoundObject.play();
        else if(choice === 'selectSound')
          soundCollection.selectSoundObject.play();
        else if(choice ==='pokeSortHoverSound')
          soundCollection.pokeSortHoverSoundObject.play();
        else if(choice ==='pokeSortSelectSound')
          soundCollection.pokeSortSelectSoundObject.play();
      }

      resolve({
        collection: {
          backgroundMusicObject,
          hoverSoundObject,
          selectSoundObject,
          pokeSortHoverSoundObject,
          pokeSortSelectSoundObject
        },
        musicPlayer: play
      });
    });
  });
}

module.exports = {
  initializeJukebox
}
