const BITS = 6;

function i2b(i) {
    var str = i.toString(2);
    while (str.length < BITS) str = "0" + str;
    str = str.split('0').join("○");
    str = str.split('1').join("●");
    return str;
}

function set_clock() {
    var d = new Date();
    var h = i2b(d.getHours()),
        m = i2b(d.getMinutes()),
        s = i2b(d.getSeconds());
    var str = '';
    for (var i = 0; i < BITS; ++i) {
        str += `${h[i]}&nbsp;${m[i]}&nbsp;${s[i]}<br>`;
    }
    document.getElementById('ck').innerHTML = str;
}

set_clock();
setInterval(set_clock, 1000);

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var bgs = [
    "./bg/moon.png",
    "./bg/wall1.png",
    "./bg/wall2.png"
];

document.body.setAttribute("style", `
    background: url('${bgs[rand(0, bgs.length)]}') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;`);

function card(img, title, tags, text) {
    return `
    <div class="card" onclick="location.href='https://github.com/Naheel-Azawy/${title}'">
      <img class="card_img" src="${img}">
      <div class="card_cont" align="left">
        <h2><b>${title}</b></h2>
        <p style="height:75px">${text}</p>
        <div align="right"><small>${tags}</small></div>
      </div>
    </div>`;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

window.onload = function() {
    let cards = "";
    for (let thing of shuffle(Object.keys(things))) {
        let t = things[thing];
        if (t.text == "" || t.img == "") continue;
        cards += card(t.img, thing, t.tags, t.text) + "<br>";
    }
    document.getElementById("cards").innerHTML = cards;
};