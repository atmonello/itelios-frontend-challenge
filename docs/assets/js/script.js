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

for (var a = 0; a < data.widget.size; a++) {
    var item = document.createElement('li');
    item.className = 'item item-recommendation item-' + a;
    item.innerHTML = '<div class="item-image"></div><h3 class="item-name"></h3><p class="item-old-price">De: <span class="value"></span></p><p class="item-price">Por: <span class="value"></span></p><p class="item-payment"><span class="value"></span></p>'
    var recommended = document.getElementsByClassName('items-list');
    recommended[0].appendChild(item);
}

var slider = tns({
    container: '.items-list',
    items: 3,
    slideBy: 'page',
    autoplay: false,
    fixedWidth: 240,
    controls: false,

});
