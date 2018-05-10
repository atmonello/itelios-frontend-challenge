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

for (var i = 0; i < data.widget.size; i++) {
    var item = document.createElement('div');
    item.className = 'item';
    var recommended = document.getElementsByClassName('items-list');
    console.log(item);
    console.log(recommended);
    recommended[0].appendChild(item);
}

