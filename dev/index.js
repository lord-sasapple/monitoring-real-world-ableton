const path = require('path');
const Max = require('max-api');
const insecam = require("insecam-api");

// This will be printed directly to the Max console
Max.post(`Loaded the ${path.basename(__filename)} script`);

// const express = require("express");
// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);


/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
// var server = app.listen(4000, function(){
//     console.log("Node.js is listening to PORT:" + server.address().port);
// });

// app.get("/test", function(req, res, next){
//     Max.post('ye')
//     res.json({'unti':'unti'})
// });

// app.get('/' , function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });

// io.on('connection',function(socket){
//     Max.post('connected');
// });
const images = [
    "http://180.52.63.216:50000/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1579209520.jpg",
    "http://128.28.102.107:6002/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1579210038.jpg",
    "http://106.172.137.40:8001/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1579205816.jpg",
    "http://126.165.128.155:50000/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1579208953.jpg",
    "http://120.51.171.150/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1579210125.jpg",
]
let img;
// Use the 'addHandler' function to register a function for a particular message
Max.addHandler("bang", () => {
    img = images[Math.floor(Math.random() * images.length)];
    Max.outlet(img);
    // getNewCam();
    // Max.outlet('http://49.128.105.51:8082/cgi-bin/viewer/video.jpg?r=COUNTER')
});

// Use the 'outlet' function to send messages out of node.script's outlet
Max.addHandler("echo", (msg) => {
    Max.outlet(msg);
});

for (let i = 0; 20>i; i++){
    getNewCam()
}
let c = 0;
function getNewCam(){
    insecam.countries.then((res)=>{
        const countries = Object.entries(res);
        const randomCountry = countries[Math.floor(Math.random() * countries.length)][0];
        Max.post(randomCountry);
        insecam.country(randomCountry).then((res)=>{
            insecam.camera(res[0]).then((res)=>{
                c++
                Max.post(c)
                switch (res.manufacturer){
                    case "Defeway":
                        images.push(res.image)
                        break;
                    case "Panasonic":
                        images.push(res.image)
                        break;
                    case "Vivotek":
                        images.push(res.image)
                        break;
                    case "Megapixel":
                        images.push(res.image)
                        break;
                    default:
                        break;
                }
            });
        });
    });
}

/*

node.script: {
	"id" : "844306",
	"link" : "http://87.116.144.134:80/",
	"image" : "http://87.116.144.134:80/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&COUNTER",
	"country" : "Serbia",
	"ccode" : "RS",
	"region" : "Juznobacki Okrug",
	"city" : "Novi Sad.",
	"loclat" : "45.251670",
	"loclon" : "19.836940",
	"zip" : "21411",
	"timezone" : "+01:00",
	"manufacturer" : "Megapixel"
}



*/