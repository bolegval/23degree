ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [43.23837575260569, 76.94457614274866],

    zoom: 13,
  });
  var myPlacemark = new ymaps.Placemark([43.23837575260569, 76.94457614274866]);
  myMap.geoObjects.add(myPlacemark);
}
