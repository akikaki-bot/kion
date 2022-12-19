var kion = document.getElementById("kion")
var kansou = document.getElementById("kansou")
var debug = "";

fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&hourly=temperature_2m&timezone=Asia%2FTokyo')
.then(response => response.json())
.then((data)=> {
    var labels = []
    var length = 0
    var comment = "あついよなまじ"
    for(i of data.hourly.time){
        //0---4/67/90T
        //YYYY-DD-MMTHH:MM
        console.log(i)

        let basemath = Number(i.substring(6,7))
        let basemath2 = Number(i.substring(8,10))
        let basemath3 = +(i.substring(11,13))

        //console.log(basemath)

        let tf = false

        if(+(i.substring(5,6)) === 1){
          basemath = +(i.substring(5,7))
          basemath2 = +(i.substring(8,10))
          basemath3 = +(i.substring(11,13))
          tf = true
        }

        debug += basemath+"b / "+basemath2+"b2 / "+basemath3+"b3 / "+tf+"tf / "+i.substring(5,7)+" / "+i.substring(8,10)+"\n"
        
        if(basemath === Number(new Date().getMonth() + 1)){
          //console.log(i)
          if(basemath2 === Number(new Date().getDate().toString().slice(-2))){
            console.log(i)
             labels.push(i)
             if(basemath3 === Number(new Date().getHours())){
                console.log(data.hourly.temperature_2m[length])
                //めも
                /** 
                 * <= 10
                 * 10以下であるか
                 * ...てかんじ。
                 * <=
                 * 一見矢印だよねこれ
                 * 見間違えるよねこれ
                */
                if(data.hourly.temperature_2m[length] <= 10){
                  comment = "❄️え、寒くね？"
                } else if(data.hourly.temperature_2m[length] <= 20){
                  comment = "🍁こんぐらいでいいんだよ...まじ。"
                } else if(data.hourly.temperature_2m[length] <= 30){
                  comment = "🍁とくに、普通だね。"
                } else if(data.hourly.temperature_2m[length] <= 40){
                  comment = "🌞太陽からの熱暑すぎだろ！！"
                } else if(data.hourly.temperature_2m[length] <= 255){
                  comment = "😱は？"
                }
                kansou.innerHTML = comment
                kion.innerHTML = data.hourly.temperature_2m[length] + "℃"
             }
             console.log(new Date().getHours())
          }
        }
        length++
    }
    console.log(labels)
    //console.log(Number(new Date().getMonth() + 1)+"/"+Number(new Date().getDate().toString().slice(-2)))
    const mydata = {
        labels: labels,
        datasets: [{
            label: '気温',
            data: data.hourly.temperature_2m,
            borderColor: 'rgb(192, 75, 75)',
        }]
    }
      
    new Chart(document.getElementById('graph'), {
        type: 'line',
        data: mydata,
    });
    console.log(data)
    console.log(debug)
})
