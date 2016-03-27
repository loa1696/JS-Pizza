function initialize() {
//Тут починаємо працювати з картою
    console.log('!!');
var mapProp = {
        center: new google.maps.LatLng(50.464379,30.519131),
        zoom: 11
    };
    var html_element = document.getElementById("googleMap");
    var map = new google.maps.Map(html_element, mapProp);
//Карта створена і показана
}
// //Коли сторінка завантажилась
google.maps.event.addDomListener(window, 'load', initialize);

var point	=	new	google.maps.LatLng(50.464379,30.519131);
var marker	=	new	google.maps.Marker({
    position:	point,
//map	- це змінна карти створена за допомогою new google.maps.Map(...)
map:	map,
    icon:	"assets/images/map-icon.png"
});
