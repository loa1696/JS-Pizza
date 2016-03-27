/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    var API=require('./API');

    API.getPizzaList(function(err,pizza_list){
        if(err){
            return console.error(err);
        }console.log("Pizza List",pizza_list);
        PizzaCart.initialiseCart();
        PizzaMenu.initialiseMenu(pizza_list);
    })



    $("#order").click(function(){
        //API.createOrder({
        //    name: "",
        //    phone: "",
        //    pizza: PizzaCart.getPizzaInCart()
        //}, function(err,result){
        //    if(err){
        //        alert("Can't get order");
        //    }else{
                //or with link a href
        if($(".sidePanel").find(".allPizzasNumber").text()!='0'){
                window.location='/order.html';
        }
                //alert("Order created");
            //}
        //})
    })

    $("#editOrder").click(function(){
        window.location='/';
    })

    $("#next").click(function(){
        var validation1=0;
        var validation2=0;
        var validation3=0;
        //if{
        if(($("#name").val()=="")||($("#name").val().search(/[0-9]/i)!=-1)){
            $("#helpBlock1").removeClass('invisible');
            validation1=1;
            //var i=$("#name").value.search(/[0-9]/i);   ($("#name").value==null)||($("#name").value=="")||($("#name").value.search(/[0-9]/i)!=-1)
            //$("#helpBlock1").value(i)
            //$('#name').parent.find('.l').addClass('errorLabel');
            //$("#name").addClass("errorBorder");
        }else{
            $("#helpBlock1").addClass('invisible');
            validation1=0;
        }

        if(($("#phoneNumber").val()=="")||(($("#phoneNumber").val().substring(0,1)!='0')&&($("#phoneNumber").val().substring(0,4)!="+380"))){
            $("#helpBlock2").removeClass('invisible');
            validation2=1;
        }else{
            $("#helpBlock2").addClass('invisible');
            validation2=0;
        }
        if(($("#adress").val()=="")){
            $("#helpBlock3").removeClass('invisible');
            validation3=1;
        }else{
            $("#helpBlock3").addClass('invisible');
            validation3=0;
        }
    //}else{
        if(validation1==0&&validation2==0&&validation3==0){
        API.createOrder({
            name: $("#name").val(),
            phone: $("#phoneNumber").val(),
            adress: $("#adress").val(),
            pizza: PizzaCart.getPizzaInCart()
        }, function(err,result){
            if(err){
                alert("Can't get order");
            }else{
                LiqPayCheckout.init({
                    data: result.data,
                    signature:result.signature,
                    embedTo: "#liqpay",
                    mode: "popup"
                    // embed || popup
                    }).on("liqpay.callback", function(data){
                    console.log(data.status);
                    console.log(data);
                }).on("liqpay.ready", function(data){
                    // ready
                    }).on("liqpay.close", function(data){
                    // close
                    });

                }
        })
        }

    })

    //require('./googleMap');
    //var directionDisplay;
    function initialize() {
//Тут починаємо працювати з картою
//        directionDisplay=new google.maps.DirectionRenderer();
        console.log('!!');
        var mapProp = {
            center: new google.maps.LatLng(50.464379,30.519131),
            zoom: 11
        };
        var html_element = document.getElementById("googleMap");
        var map = new google.maps.Map(html_element, mapProp);
        var point	=	new	google.maps.LatLng(50.464379,30.519131);
        //alert(point);
        var markerPizza	=	new	google.maps.Marker({
            position:	point,
//map	- це змінна карти створена за допомогою new google.maps.Map(...)
            map:	map,
            icon:	"assets/images/map-icon.png"
        });
//Карта створена і показана

        google.maps.event.addListener(map,
            'click',function(me){
                var coordinates	=	me.latLng;
//coordinates	- такий самий об’єкт як створений new google.maps.LatLng(...)
            });

        var marker;
        var path;
        var point	=	new	google.maps.LatLng(50.464379,30.519131);
        google.maps.event.addListener(map,
            'click',function(me){
                var coordinates	=	me.latLng;
                geocodeLatLng(coordinates,	function(err,	adress){
                    if(!err)	{
//Дізналися адресу
                        console.log(adress);
                        if(marker){
                            marker.setMap(null);
                        }
                        marker	=	new	google.maps.Marker({
                            position:	coordinates,
//map	- це змінна карти створена за допомогою new google.maps.Map(...)
                            map:	map,
                            icon:	"assets/images/home-icon.png"
                        });

                        $("#adress").val(adress);
                        //var point	=	new	google.maps.LatLng(50.464379,30.519131);
                        calculateRoute(point, coordinates, function(err, duration){
                            if(!err){
                                console.log(duration);
                                //console.log(travelMode);

                                $("#when").text(duration.duration.text);
                            }

                        })
                        calculateRoute(point, coordinates, function(err,overview_path){
                            if(!err){
                                console.log(overview_path);
                                //console.log(travelMode);
                                if(path){
                                    path.setMap(null);
                                }
                                //var coord=[point, coordinates];
                                path=new google.maps.Polyline({
                                    path: overview_path.overview_path,
                                    geodesic: true,
                                    strokeColor: "#5BB4FF",
                                    strokeOpacity: 0.75
                                })
                                path.setMap(map);
                            }

                        })
                        $("#where").text(adress);
                    }	else	{
                        console.log("Немає адреси")
                    }
                })
            });

        $("#adress").focusout(function(){
            var adress=$("#adress").val();
            geocodeAddress(adress,	function(err,	coordinates){
                if(!err)	{
//Дізналися адресу
                    console.log(coordinates);
                    if(marker){
                        marker.setMap(null);
                    }
                    marker	=	new	google.maps.Marker({
                        position:	coordinates,
//map	- це змінна карти створена за допомогою new google.maps.Map(...)
                        map:	map,
                        icon:	"assets/images/home-icon.png"
                    });
                    //$("#adress").val(adress);
                    $("#adress").val(adress);
                    //var point	=	new	google.maps.LatLng(50.464379,30.519131);
                    calculateRoute(point, coordinates, function(err, duration){
                        if(!err){
                            console.log(duration);
                            $("#when").text(duration.duration.text);
                        }

                    })
                    calculateRoute(point, coordinates, function(err,overview_path){
                        if(!err){
                            console.log(overview_path);
                            //console.log(travelMode);
                            if(path){
                                path.setMap(null);
                            }
                            //var coord=[point, coordinates];
                            path=new google.maps.Polyline({
                                path: overview_path.overview_path,
                                geodesic: true,
                                strokeColor: "#5BB4FF",
                                strokeOpacity: 0.75
                            })
                            path.setMap(map);
                        }

                    })
                    $("#where").text(adress);
                }	else	{
                    console.log("Немає координат")
                }
            })
        })

    }
// //Коли сторінка завантажилась
    google.maps.event.addDomListener(window, 'load', initialize);



    function	geocodeLatLng(latlng,	 callback){
//Модуль за роботу з адресою
        var geocoder	=	new	google.maps.Geocoder();
        geocoder.geocode({'location':	latlng},	function(results,	status)	{
            if	(status	===	google.maps.GeocoderStatus.OK&&	results[1])	{
                var adress =	results[1].formatted_address;
                callback(null,	adress);
            }	else	{
                callback(new	Error("Can't	find	adress"));
            }
        });
    }

    function	geocodeAddress(adress,	 callback)	{
        var geocoder	=	new	google.maps.Geocoder();
        geocoder.geocode({'address':	adress},	function(results,	status)	{
            if	(status	===	google.maps.GeocoderStatus.OK&&	results[0])	{
                var coordinates	=	results[0].geometry.location;
                callback(null,	coordinates);
            }	else	{
                callback(new	Error("Can	not	find	the	adress"));
            }
        });
    }

    function	calculateRoute(A_latlng,	 B_latlng,	callback)	{
        var directionService =	new	google.maps.DirectionsService();
        //var directionDispaly=new google.maps.DirectionsRenderer();
        directionService.route({
            origin:	A_latlng,
            destination:	B_latlng,
            travelMode:	google.maps.TravelMode["DRIVING"]
        },	function(response,	status)	{
            if	(	status	==	google.maps.DirectionsStatus.OK )	{
                var leg	=	response.routes[	0	].legs[	0	];
                //directionDispaly.setDirections(response);
                callback(null,	{
                    duration:	leg.duration,
                    overview_path: response.routes[	0	].overview_path
                });
            }	else	{
                callback(new	Error("Can'	not	find	direction"));
            }
        });
    }



    //marker.setMap();
    //google.maps.event.addDomListener(window, 'load', initialize);
});

