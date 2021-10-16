var localeStor = [];

var used = [[-1, -1, -1], [-1, -1, -1]];
var cnt = -1;

var button_click = 0;

document.addEventListener('DOMContentLoaded', function() {
if(localStorage.getItem('localeStor')) {
    var json = localStorage.getItem('localeStor');
    localeStor = JSON.parse(json);
    var sum = 0;
    
    for(var i=0; i<localeStor.length; i++) {
        var but, name;
        cnt += 1;
        if(localeStor[i][2] == 250) { but = 0; }
        if(localeStor[i][2] == 450) { but = 1; }
        name = localeStor[i][1];
        if(localeStor[i][1].localeCompare("Гватемала Антигуа") == 0) { name = 0;}
        if(localeStor[i][1].localeCompare("Эфиопия Йоргачеф") == 0) { name = 1;}
        if(localeStor[i][1].localeCompare("Колумбия Супремо") == 0) { name = 2;}
        used[but][name] = cnt;

        insert_coffee_to_basket(cnt);
        document.getElementsByClassName('popup-coffee-name')[cnt].childNodes[0].textContent = localeStor[i][1];
        document.getElementsByClassName('popup-coffee-name')[cnt].childNodes[1].textContent = " (" + localeStor[i][2] +" гр.)";
        document.getElementsByClassName('popup-one-good-cost')[cnt].textContent = localeStor[i][3];
        document.getElementsByClassName('number-coffee')[cnt].value = localeStor[i][4];
        var count = localeStor[i][4];
        popup_one_coffee_all_cost(count, i);

        sum += Number.parseInt(document.getElementsByClassName('all-one-coffee-cost-rub')[i].textContent);
    }
    popup_visible(sum);
    total_payment(cnt);
}
document.getElementById("cost1").textContent = "380 руб."; button_click = 250;
document.getElementById("cost2").textContent = "445 руб."; button_click = 250;
document.getElementById("cost3").textContent = "275 руб."; button_click = 250;

document.getElementById("weight1").onclick = function() { 
    document.getElementById("cost1").textContent = "380 руб."; button_click = 250;};
document.getElementById("weight2").onclick = function() { 
    document.getElementById("cost1").textContent = "680 руб."; button_click = 450;};
document.getElementById("weight11").onclick = function() { 
    document.getElementById("cost2").textContent = "445 руб."; button_click = 250;};
document.getElementById("weight22").onclick = function() { 
    document.getElementById("cost2").textContent = "880 руб."; button_click = 450;};
document.getElementById("weight111").onclick = function() { 
    document.getElementById("cost3").textContent = "275 руб."; button_click = 250;};
document.getElementById("weight222").onclick = function() { 
    document.getElementById("cost3").textContent = "495 руб."; button_click = 450;};

change_active_weight("gramm1");
change_active_weight("gramm2");
change_active_weight("gramm3");

});

function change_active_weight(weight) {
    var menuItems = document.getElementsByClassName(weight);
    var onClick = function (event) {
	    event.preventDefault();  
        for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('active');
        }  
        event.currentTarget.classList.add('active');
    };

    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('click', onClick, false);
    }   
}

function add_backet(e) {
    var sum = 0;
    var but;
    if(button_click == 250) { but = 0; }
    if(button_click == 450) { but = 1; }
    var use = used[but][Number.parseInt(e)];
    var tmp = document.getElementsByClassName('cost')[e].childNodes[0].textContent;
    var value = Number.parseInt(tmp);

    if(use == -1) {
        cnt ++;
        insert_coffee_to_basket(cnt);
        //определяет название и граммы кофе в корзине
        var name_coffee = document.getElementsByClassName('coffee-name')[e].childNodes[0].textContent;    
        document.getElementsByClassName('popup-coffee-name')[cnt].childNodes[0].textContent = name_coffee;
        document.getElementsByClassName('popup-coffee-name')[cnt].childNodes[1].textContent = " (" + button_click +" гр.)";
 
        document.getElementsByClassName('popup-one-good-cost')[cnt].textContent = tmp;
        var num = Number.parseInt(document.getElementsByClassName('number-coffee')[cnt].value);
        popup_one_coffee_all_cost(num, cnt);

        used[but][Number.parseInt(e)] = cnt;

        localeStor[cnt] = [];    
        localeStor[cnt][0] = cnt;
        localeStor[cnt][1] = name_coffee;
        localeStor[cnt][2] = button_click;
        localeStor[cnt][3] = tmp;
        localeStor[cnt][4] = num;
             
        var json = JSON.stringify(localeStor);
        localStorage.setItem('localeStor', json);              
    }
    else {
        var num1 = Number.parseInt(document.getElementsByClassName('number-coffee')[use].value);
        num1 += 1;
        document.getElementsByClassName('number-coffee')[use].value = num1;
        popup_one_coffee_all_cost(num1, use);
        
        var json = localStorage.getItem('localeStor');
        localeStor = JSON.parse(json); 
        if(localeStor[use][0] == use) {
            localeStor[use][4] = num1;
            var json = JSON.stringify(localeStor);
            localStorage.setItem('localeStor', json);
        }
    }     
//    }
    
    
/*   insert_coffee_to_basket(cnt);
    var tmp = document.getElementsByClassName('cost')[e].childNodes[0].textContent;
    var value = Number.parseInt(tmp);
    console.log("tmp " + tmp);
    ///popup_coffee_cost(tmp, cnt);

    //определяет название и граммы кофе в корзине
    var name_coffee = document.getElementsByClassName('coffee-name')[e].childNodes[0].textContent;    
    document.getElementsByClassName('popup-coffee-name')[cnt].childNodes[0].textContent = name_coffee;
    document.getElementsByClassName('popup-coffee-name')[cnt].childNodes[1].textContent = " (" + button_click +" гр.)";
 
    document.getElementsByClassName('popup-one-good-cost')[cnt].textContent = tmp;
    console.log("type " + document.getElementsByClassName('popup-one-good-cost')[cnt].textContent);
    var num = Number.parseInt(document.getElementById('coffee_number').value);
    popup_one_coffee_all_cost(num, cnt);
*/
    //localeSt();
    //localStorage.setItem("cnt", num);
    sum += value;
    popup_visible(sum);

    total_payment(cnt);
}

function popup_visible(sum) {
    if(sum > 0) {
        document.getElementById('order').style.display = 'flex';
        document.getElementById('order').style.justifyContent = 'space-between';
        document.getElementById('circle').textContent = cnt + 1;
        document.getElementById('basket-empty').style.display = 'none';
        document.getElementById('basket').style.justifyContent = 'space-between';
    }
}

//общая сумма
function total_payment(cnt) {
    var sum = 0;
    for(var i=0; i<=cnt; i++) {
        sum += Number.parseInt(document.getElementsByClassName('all-one-coffee-cost-rub')[i].textContent);
    }
    document.getElementById("bill").textContent = sum;

    document.getElementById('total-payment-cost').textContent = sum;
}

//стоимость одной позиции кофе с определенным количеством (одна строка)
function popup_one_coffee_all_cost(num, id) {
    var popup_one_coffee = document.getElementsByClassName('popup-one-good-cost')[id].textContent;
    document.getElementsByClassName('all-one-coffee-cost-rub')[id].textContent = Number.parseInt(popup_one_coffee) * num;   
}

function minus(id) {
    var num = Number.parseInt(document.getElementsByClassName('number-coffee')[id].value);
    var num_new = document.getElementsByClassName('number-coffee')[id].value;
    var cost = 0;
    if(num > 0) {
        num -= 1;
        num_new = num;
        document.getElementsByClassName('number-coffee')[id].value = num_new;
        cost = popup_one_coffee_all_cost(num_new, id); 
    }   
    var json = localStorage.getItem('localeStor');
    localeStor = JSON.parse(json);
    localeStor[id][4] = Number.parseInt(document.getElementsByClassName('number-coffee')[id].value);
    var json1 = JSON.stringify(localeStor);
    localStorage.setItem('localeStor', json1);
    

    document.getElementById('total-payment-cost').textContent = cost;
    total_payment(cnt);    
}

function plus(id) {
    var num = Number.parseInt(document.getElementsByClassName("number-coffee")[id].value);
    var num_new = document.getElementsByClassName("number-coffee")[id].value;
    num += 1;
    num_new = num;  
    document.getElementsByClassName("number-coffee")[id].value = num_new;
    
    var cost = popup_one_coffee_all_cost(num_new, id);
    document.getElementById("total-payment-cost").textContent = cost; 

    total_payment(cnt);

    var json = localStorage.getItem('localeStor');
    localeStor = JSON.parse(json);
    localeStor[id][4] = num_new;
    var json1 = JSON.stringify(localeStor);
    localStorage.setItem('localeStor', json1);
}

function insert_coffee_to_basket(product_id) {
    document.getElementById('popup_goods').style.display = 'block';

    var parent_node = document.getElementById('popup_goods_backet');
    if(product_id == 0) {
        parent_node.insertAdjacentHTML('beforeEnd', '<section class="popup-goods-selected" id="0"><div class="popup-goods-name"><p class="popup-coffee-name">Эфиопия <span class="coffee-selected">(250 гр.)</span></p></div><div class="popup-goods-cost" id="popup_goods_cost"><span class="popup-one-good-cost">0 руб.</span></div><div class="popup-goods-number" id="popup_goods_number"><p class="plus-minus" onclick="minus(0)"><i class="fas fa-minus"></i></p><input type="text" class="number-coffee" id="coffee_number" value="1"/><p class="plus-minus plus" onclick="plus(0)"><i class="fas fa-plus"></i></p></div><div class="popup-goods-cost popup-goods-all-cost"><p class="all-one-coffee-cost"><span class="all-one-coffee-cost-rub">0</span> руб.</p></div><div class="delete-goods"><i class="fas fa-times1" onclick="delete_coffee(0)"></i></div></section>');
    }
    if(product_id == 1) {
        parent_node.insertAdjacentHTML('beforeEnd', '<section class="popup-goods-selected" id="1"><div class="popup-goods-name"><p class="popup-coffee-name">Эфиопия <span class="coffee-selected">(250 гр.)</span></p></div><div class="popup-goods-cost" id="popup_goods_cost"><span class="popup-one-good-cost">0 руб.</span></div><div class="popup-goods-number" id="popup_goods_number"><p class="plus-minus" onclick="minus(1)"><i class="fas fa-minus"></i></p><input type="text" class="number-coffee" id="coffee_number" value="1"/><p class="plus-minus plus" onclick="plus(1)"><i class="fas fa-plus"></i></p></div><div class="popup-goods-cost popup-goods-all-cost"><p class="all-one-coffee-cost"><span class="all-one-coffee-cost-rub">0</span> руб.</p></div><div class="delete-goods"><i class="fas fa-times1" onclick="delete_coffee(1)"></i></div></section>');
    }
    if(product_id == 2) {
        parent_node.insertAdjacentHTML('beforeEnd', '<section class="popup-goods-selected" id="2"><div class="popup-goods-name"><p class="popup-coffee-name">Эфиопия <span class="coffee-selected">(250 гр.)</span></p></div><div class="popup-goods-cost" id="popup_goods_cost"><span class="popup-one-good-cost">0 руб.</span></div><div class="popup-goods-number" id="popup_goods_number"><p class="plus-minus" onclick="minus(2)"><i class="fas fa-minus"></i></p><input type="text" class="number-coffee" id="coffee_number" value="1"/><p class="plus-minus plus" onclick="plus(2)"><i class="fas fa-plus"></i></p></div><div class="popup-goods-cost popup-goods-all-cost"><p class="all-one-coffee-cost"><span class="all-one-coffee-cost-rub">0</span> руб.</p></div><div class="delete-goods"><i class="fas fa-times1" onclick="delete_coffee(2)"></i></div></section>');
    }
    if(product_id == 3) {
        parent_node.insertAdjacentHTML('beforeEnd', '<section class="popup-goods-selected" id="3"><div class="popup-goods-name"><p class="popup-coffee-name">Эфиопия <span class="coffee-selected">(250 гр.)</span></p></div><div class="popup-goods-cost" id="popup_goods_cost"><span class="popup-one-good-cost">0 руб.</span></div><div class="popup-goods-number" id="popup_goods_number"><p class="plus-minus" onclick="minus(3)"><i class="fas fa-minus"></i></p><input type="text" class="number-coffee" id="coffee_number" value="1"/><p class="plus-minus plus" onclick="plus(3)"><i class="fas fa-plus"></i></p></div><div class="popup-goods-cost popup-goods-all-cost"><p class="all-one-coffee-cost"><span class="all-one-coffee-cost-rub">0</span> руб.</p></div><div class="delete-goods"><i class="fas fa-times1" onclick="delete_coffee(3)"></i></div></section>');
    }
    if(product_id == 4) {
        parent_node.insertAdjacentHTML('beforeEnd', '<section class="popup-goods-selected" id="4"><div class="popup-goods-name"><p class="popup-coffee-name">Эфиопия <span class="coffee-selected">(250 гр.)</span></p></div><div class="popup-goods-cost" id="popup_goods_cost"><span class="popup-one-good-cost">0 руб.</span></div><div class="popup-goods-number" id="popup_goods_number"><p class="plus-minus" onclick="minus(4)"><i class="fas fa-minus"></i></p><input type="text" class="number-coffee" id="coffee_number" value="1"/><p class="plus-minus plus" onclick="plus(4)"><i class="fas fa-plus"></i></p></div><div class="popup-goods-cost popup-goods-all-cost"><p class="all-one-coffee-cost"><span class="all-one-coffee-cost-rub">0</span> руб.</p></div><div class="delete-goods"><i class="fas fa-times1" onclick="delete_coffee(4)"></i></div></section>');
    }
    if(product_id == 5) {
        parent_node.insertAdjacentHTML('beforeEnd', '<section class="popup-goods-selected" id="5"><div class="popup-goods-name"><p class="popup-coffee-name">Эфиопия <span class="coffee-selected">(250 гр.)</span></p></div><div class="popup-goods-cost" id="popup_goods_cost"><span class="popup-one-good-cost">0 руб.</span></div><div class="popup-goods-number" id="popup_goods_number"><p class="plus-minus" onclick="minus(5)"><i class="fas fa-minus"></i></p><input type="text" class="number-coffee" id="coffee_number" value="1"/><p class="plus-minus plus" onclick="plus(5)"><i class="fas fa-plus"></i></p></div><div class="popup-goods-cost popup-goods-all-cost"><p class="all-one-coffee-cost"><span class="all-one-coffee-cost-rub">0</span> руб.</p></div><div class="delete-goods"><i class="fas fa-times1" onclick="delete_coffee(5)"></i></div></section>');
    }
}

function delete_coffee(id) {
    var total_cost = Number.parseInt(document.getElementById('total-payment-cost').textContent);
    console.log("total-pay = " + total_cost);
    var delete_coffee_cost = Number.parseInt(document.getElementsByClassName('all-one-coffee-cost-rub')[id].textContent);
    console.log("all-one-coffee = " + delete_coffee_cost);
    document.getElementById('total-payment-cost').textContent = total_cost - delete_coffee_cost;

    var parent_elem = document.getElementById('popup_goods_backet');
    var remove_elem = document.getElementById(id);
    parent_elem.removeChild(remove_elem);

   /* for(var i=0; i<=4; i++) {
        localeStor[id][i] = 0;
    }

    var json = JSON.stringify(localeStor);
    localStorage.setItem('localeStor', json);  
    */    
    localStorage.removeItem(0);
}
