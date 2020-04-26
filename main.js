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

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function card(img, title, tags, text, link) {
    return `
    <div class="card" onclick="openInNewTab('${link}')">
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

async function main() {

    set_clock();
    setInterval(set_clock, 1000);

    window.onload = function() {

        let the_things = shuffle(Object.keys(things)).sort(function(a, b){
            if(things[a].class < things[b].class) { return -1; }
            if(things[a].class > things[b].class) { return 1;  }
            return 0;
        });

        let top_thing;

        function show_things(thingy_things, search) {
            top_thing = undefined;
            let cards = "";
            for (let thing of thingy_things) {
                let t = things[thing];
                if (!t.link) {
                    t.link = `https://github.com/Naheel-Azawy/${thing}`;
                }
                if (t.text == "" || t.img == "") continue;
                if (search) {
                    search = search.toLowerCase();
                    if (!thing.toLowerCase().includes(search) &&
                        !t.text.toLowerCase().includes(search)) {
                        continue;
                    }
                }
                if (!top_thing) {
                    top_thing = t;
                }
                cards += card(t.img, thing, t.tags, t.text, t.link) + "<br>";
            }
            document.getElementById("cards").innerHTML = cards;
        }

        show_things(the_things);

        let bgImg = new Image();
        bgImg.src = bgs[rand(0, bgs.length)];
        //bgImg.src = "./bg/a.png";
        bgImg.onload = function() {
            document.getElementById("background")
                .style.backgroundImage = `url(${bgImg.src})`;
        };

        let search = document.getElementsByClassName("search")[0];
        search.addEventListener('input', () => {
            show_things(the_things, search.value);
            if (event.keyCode === 13) {
                openInNewTab(top_thing.link);
            }
        });

        search.addEventListener('keyup', event => {
            if (event.keyCode === 13) {
                openInNewTab(top_thing.link);
            }
        });

        document.getElementById("vert").innerHTML =
            HijriJS.today().toFormat("yyyy.mm.dd");

    };

}

main();
