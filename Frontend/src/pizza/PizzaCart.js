/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage=require('../Storage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

var sumOfOrder=0;

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок



    if(isInCart(Cart,pizza,size)!=-1){
        Cart[isInCart(Cart,pizza,size)].quantity += 1;
    }else{
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });

    var new_number = $(".sidePanel").find(".allPizzasNumber").text();
    new_number=parseInt(new_number)+1;
    $(".sidePanel").find(".allPizzasNumber").text(new_number);


    }
    sumOfOrder=sumOfOrder+pizza[size].price;
    $("#sum").text(sumOfOrder);
    //Оновити вміст кошика на сторінці
    updateCart();
}

function isInCart(Cart, pizza, size){
    for(var i=0;i<Cart.length;i++){
        if((Cart[i].pizza==pizza)&&(Cart[i].size==size)) return i;
        //
    }
    return -1;
}



function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    var html_code = Templates.PizzaCart_OneItem(cart_item);

    var $node = $(html_code);

        $node.remove();

    var position=Cart.indexOf(cart_item);

    Cart.splice(position,1);

    var new_number = $(".sidePanel").find(".allPizzasNumber").text();
    new_number=parseInt(new_number)-1;
    $(".sidePanel").find(".allPizzasNumber").text(new_number);

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    var saved_pizza=Storage.get('cart');
    if(saved_pizza){
        Cart=saved_pizza;
    }


    var saved_number=Storage.get("number_sidePanel");
    if(saved_number){
        $(".sidePanel").find(".allPizzasNumber").text(saved_number)
    }

    var saved_sum=Storage.get("sum");
    if(saved_sum){
        sumOfOrder=saved_sum;
        $("#sum").text(sumOfOrder);
    }
    var url=window.location.toString();

    if(url.indexOf('/order.html')+1){
        $('#deleteOrders').addClass("invisible");
        $("#order").addClass("invisible");
        $("#editOrder").removeClass("invisible");
        //alert(1);
    }else{
        $('#deleteOrders').removeClass("invisible");
        $("#order").removeClass("invisible");
        $("#editOrder").addClass("invisible");
        //alert(url);
    }

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            var s=$node.find("#price").text();
            //sumOfOrder=sumOfOrder+cart_item.pizza[size].price;
            sumOfOrder=sumOfOrder+parseInt(s);
            $("#sum").text(sumOfOrder);

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            //Зменшуємо кількість замовлених піц
            if(cart_item.quantity==1){
                removeFromCart(cart_item);
            }
            else{
            cart_item.quantity -= 1;
            }
            var s=$node.find("#price").text();
            //sumOfOrder=sumOfOrder-cart_item.pizza[size].price;
            sumOfOrder=sumOfOrder-parseInt(s);
            $("#sum").text(sumOfOrder);

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".remove").click(function(){
            removeFromCart(cart_item);
            var s=$node.find("#price").text();
            var amount = $node.find("#quantity").text();
            sumOfOrder=sumOfOrder-parseInt(s)*parseInt(amount);
            $("#sum").text(sumOfOrder);
        })

        var url=window.location.toString();

        if(url.indexOf('/order.html')+1){
            $node.find('.plus').addClass("invisible");
            $node.find('.minus').addClass("invisible");
            $node.find('.remove').addClass("invisible");

        }else{
            $node.find('.plus').removeClass("invisible");
            $node.find('.minus').removeClass("invisible");
            $node.find('.remove').removeClass("invisible");

        }

        $cart.append($node);
        //$("#sum").text(sumOfOrder);
    }

    Cart.forEach(showOnePizzaInCart);

    var nu = $(".sidePanel").find(".allPizzasNumber").text();
    Storage.set("number_sidePanel",nu);
    //var summa=$("#sum").text();
    Storage.set("sum", sumOfOrder);
    Storage.set("cart",Cart);
}

$("#deleteOrders").click(function(){
    //Cart.forEach(removeFromCart);
    //updateCart();
    Cart=[];
    $cart.html("");
    $(".sidePanel").find(".allPizzasNumber").text("0");
    sumOfOrder=0;
    $("#sum").text(sumOfOrder);
    updateCart();

})

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;