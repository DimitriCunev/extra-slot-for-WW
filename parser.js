var fs = require('fs');
const path = require('path');
///const directoryPath = path.join(__dirname, 'Documents');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


function analyzeDirectory(str){
    // const directoryPath = path.join(`C:\\Users\\Dima\\AppData\\Roaming\\.minecraft\\saves\\FlooNetwork\\datapacks\\hp\\data\\hp\\functions\\quests`); 
    let dir = path.join(str)
    let files = []
    let folders = []
    fis = fs.readdirSync(dir)
    fis.forEach(function (file) {
        if (file.toString().indexOf(".mcfunction")>=0){
            files.push(file)
        } else {
            folders.push(file)
        }
    });
    return {files:files,folders:folders}

}

function updateFile(data){ 
    matches = data.match(/.*(playerID=4).*/)
    let amount = 0 

        while(matches){
            console.log(matches[0])
            let wantedString = matches[0].replace(/playerID=4/,"playerID=5")
            data = data.replace(/.*(playerID=4).*/,
            matches[0].replace(/playerID=4/,"playerID=testXX").replaceAll(/p4/g,"ptestXX")+
           `\n${wantedString}`
           .replaceAll(/p4/,"p5")
           .replace(/P4/,"P5")
           .replace(/5-0-4/,"5-0-5")
           .replace(/player4/,"player5")
            )
            matches = data.match(/.*(playerID=4).*/)
            amount+=1;
        }
        

        matches = data.match(/.*( p4).*/)
        while(matches){
            console.log(matches[0])
            if(matches[0].indexOf('testXX')<0){
                let wantedString = matches[0].replace(/p4/,"p5")
                data = data.replace(/.*(p4).*/,
                matches[0].replace(/p4/,"ptestXX")+
               `\n${wantedString}`
               .replace(/5-0-4/,"5-0-5")
               .replace(/player4/,"player5")
                )
                matches = data.match(/.*( p4).*/)
                amount+=1;
            }
           
        }
        console.log(data)
        matches = data.match(/playerID=testXX/)
        while(matches){
            data = data.replace(/playerID=testXX/,'playerID=4')
            matches = data.match(/playerID=testXX/)
        }
        matches = data.match(/ptestXX/)
        while(matches){
            data = data.replace(/ptestXX/,'p4')
            matches = data.match(/ptestXX/)
        }
        console.log('even here')

    
    return {text:data,amount:amount}
}

function main(){
    let dir = "./"
    let replacedAmount = 0
    analyzeDirectory(dir).files.forEach((e)=>{
        let text = fs.readFileSync(dir+"\\"+e, 'utf8');

        data = text.toString()
        try {
            let action = updateFile(data)
            data = action.text
            replacedAmount+=action.amount
            fs.writeFileSync(dir+"\\"+e,data,'utf8')
        } catch (error) {
            console.log(error)
        }

    })
    console.log(dir)
    console.log(`Added ${replacedAmount} instances of player variables.`)
}

main()