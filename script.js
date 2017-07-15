(function (){

  // load photos
  // TODO Load this list from GitHub by API
  var photofiles = [
    '001.jpg','002.jpg','003.jpg','004.jpg',
    '005.jpg','006.jpg','007.jpg','008.jpg',
    '009.jpg','010.jpg','011.jpg','012.jpg'
  ].reverse();
  var photos_el = document.querySelector('section.photos');
  for (var i = 0; i < photofiles.length; ++i) {
    var figure_el = document.createElement('figure');
    var photofile = photofiles[i].slice(0, -4);
    figure_el.innerHTML = '<a href="photos/'+photofile+'.min.jpg" style="background-image:url(photos/'+photofiles[i]+')"></a> ';
    photos_el.appendChild(figure_el);
  }

  // make photos gallery

  var photos = document.querySelectorAll('.photos figure');

  function newRotate(){
    return Math.floor(Math.random() * 15) - 10;
  }

  function photoMouseEnter(event) {
    event.target.style.transform = 'rotate('+newRotate()+'deg)';
  }

  for (var i = 0; i < photos.length; ++i) {
    photos[i].style.transform = 'rotate('+newRotate()+'deg)';
    photos[i].addEventListener("mouseenter", photoMouseEnter);
  }

  // close popups

  var popups = document.getElementsByClassName('popup');
  for (var i = 0; i < popups.length; ++i) {
    popups[i].addEventListener("click", function (event){
      event.target.classList.toggle("visible");
    });
  }
  var popup_close_buttons = document.querySelectorAll('.popup .popup_close');
  for (var i = 0; i < popup_close_buttons.length; ++i) {
    popup_close_buttons[i].addEventListener("click", function (event){
      event.target.closest('.popup').classList.remove("visible");
    });
  }

  // make photos carousel

  var photos_carousel_el = document.querySelector('#photos_carousel_popup .carousel');

  for (var i = 0; i < photofiles.length; ++i) {
    var cell_el = document.createElement('div');
    cell_el.classList.add("carousel-cell");
    cell_el.setAttribute("data-flickity-bg-lazyload", "photos/"+photofiles[i]);
    photos_carousel_el.appendChild(cell_el);
  }

  var flkty = new Flickity(photos_carousel_el, {
    cellAlign: 'center',
    contain: true,
    bgLazyLoad: true,
    setGallerySize: false,
    pageDots: false
  });

  // click on photo - show photos_carousel_popup

  function getNodeIndex(node) {
    var index = 0;
    while ( (node = node.previousSibling) ) {
        if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
            index++;
        }
    }
    return index;
  }

  for (var i = 0; i < photos.length; ++i) {
    photos[i].addEventListener("click", function (event){
      var indexed_el = (event.target.tagName == "A" ? event.target.parentElement : event.target);
      flkty.select(getNodeIndex(indexed_el) - 1);
      document.getElementById('photos_carousel_popup').classList.add("visible");
      event.preventDefault();
    });
  }

  // footer about icon click

  document.querySelector('footer .icon').addEventListener('click', function(){
    document.getElementById('about_popup').classList.add("visible");
  });

})();
