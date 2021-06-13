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

async function main() {

    set_clock();
    setInterval(set_clock, 1000);

    window.onload = () => {

        let bgImg = new Image();
        bgImg.src = bgs[rand(0, bgs.length)];
        bgImg.onload = () => {
            document.getElementById("background")
                .style.backgroundImage = `url(${bgImg.src})`;
        };

    };

}

main();
