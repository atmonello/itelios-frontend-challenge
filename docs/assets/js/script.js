var data;

// Loads JSON file
getJSON = function(url) {
    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, false);
    xhr.onreadystatechange = function() {
        var status;
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) { // `DONE`
            status = xhr.status;
            if (xhr.status == 200) {
                parsed = JSON.parse(xhr.responseText);
                data = parsed[0].data;
                // console.log(data);
            } 
        }
    };
    xhr.send();
};

getJSON('assets/js/products.json');
console.log(data);

var viewedItem = document.getElementsByClassName('item-viewed');

var viewedItemName = viewedItem[0].querySelector('.item-name');
viewedItemName.innerText = data.item.name;

var viewedItemOldPrice = viewedItem[0].querySelector('.item-old-price .value');
viewedItemOldPrice.innerText = data.item.oldPrice;

var viewedItemCurrentPrice = viewedItem[0].querySelector('.item-price .value');
viewedItemCurrentPrice.innerText = data.item.price;


for (var a = 0; a < data.widget.size; a++) {
    var item = document.createElement('li');
    item.className = 'item item-recommendation';
    item.id = a;
    item.innerHTML = '<div class="item-image"></div><h3 class="item-name"></h3><p class="item-old-price">De: <span class="value"></span></p><p class="item-price">Por: <span class="value"></span></p><p class="item-payment"><span class="value"></span></p>'
    var recommended = document.getElementsByClassName('items-list');
    recommended[0].appendChild(item);
}

var recommendedItems = document.querySelectorAll('.items-list .item-recommendation');
for (var b = 0; b < recommendedItems.length; b++) {
    // var recommendedImage = recommendedItems[b].querySelector('.item-image');
    // recommendedImage.style.backgroundImage = 'url(' + data.recommendation[b].imageName + ')';

    var recommendedName = recommendedItems[b].querySelector('.item-name');
    recommendedName.innerText = data.recommendation[b].name;

    var recommendedOldPrice = recommendedItems[b].querySelector('.item-old-price .value');
    if (data.recommendation[b].oldPrice !== null) {
        recommendedOldPrice.innerText = data.recommendation[b].oldPrice;
    }
    else {
        var parentOldPrice = recommendedOldPrice.parentNode;
        parentOldPrice.style.display = 'none';
    }

    var recommendedCurrentPrice = recommendedItems[b].querySelector('.item-price .value');
    recommendedCurrentPrice.innerText = data.recommendation[b].price;
}

var slider = tns({
    container: '.items-list',
    items: 3,
    slideBy: 'page',
    autoplay: false,
    controls: false,
});
