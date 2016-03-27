/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = null;

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            //var txt = $(this).parent().find('.word').val();
            //$('.article:contains("' + txt + '")').hide();
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    var count=0;

    Pizza_List.forEach(function(pizza){
        //Якщо піца відповідає фільтру
        //var product=filter;
        if(filter=='meat'){
            if(typeof pizza.content.meat==='undefined'){

            }else {
                pizza_shown.push(pizza);
            }
        }else if(filter=='pineapple'){
            if(typeof pizza.content.pineapple==='undefined'){

            }else {
                pizza_shown.push(pizza);
            }
        }else if(filter=='mushroom'){
            if(typeof pizza.content.mushroom==='undefined'){

            }else {
                pizza_shown.push(pizza);
            }
        }else if(filter=='ocean'){
            if(typeof pizza.content.ocean==='undefined'){

            }else {
                pizza_shown.push(pizza);
            }
        }else if(filter=='tomato'){
            if(typeof pizza.content.tomato==='undefined'){

            }else {
                pizza_shown.push(pizza);
            }
        }else{

        }

        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

var $pizza_list=$('#pizza_list');

$("#all").click(function(){
    $pizza_list.html("");
    $("#title").text("Усі піци");
    $("#titleNumber").text("8");
    initialiseMenu();
})

$("#meat").click(function(){
    $("#all").addClass("pizzaType");
    $pizza_list.html("");
    $("#title").text("М'ясні піци");
    $("#titleNumber").text("5");
    filterPizza('meat');
})


$("#pineapple").click(function(){
    $("#all").addClass(".pizzaType");
    $pizza_list.html("");
    $("#title").text("Піци з ананасами");
    $("#titleNumber").text("3");
    filterPizza('pineapple');
})


$("#mushroom").click(function(){
    $("#all").addClass("pizzaType");
    $pizza_list.html("");
    $("#title").text("Піци з грибами");
    $("#titleNumber").text("3");
    filterPizza('mushroom');
})


$("#ocean").click(function(){
    $("#all").addClass("pizzaType");
    $pizza_list.html("");
    $("#title").text("Піци з морепродуктами");
    $("#titleNumber").text("2");
    filterPizza('ocean');
})


$("#vega").click(function(){
    $("#all").addClass("pizzaType");
    $pizza_list.html("");
    $("#title").text("Вегетаріанські піци");
    $("#titleNumber").text("1");
    filterPizza('tomato');
})


function initialiseMenu(server_list) {
    Pizza_List=server_list;
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}



exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;