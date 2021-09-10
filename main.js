import SettingsUI from "./settings/settingsUI";
import SettingsStore from './settings/SettingsStore'
import request from '../requestV2';
import Authenticator from './auth';

function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "Q" },
      { value: 1e18, symbol: "QU" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

register("command", () => SettingsUI.openGUI()).setName("settings");
var guiKeyBind = getKeyBindFromKey(Keyboard.KEY_COMMA,"Open project scyll Settings");

function getKeyBindFromKey(key, description) {
  var mcKeyBind = Client.getKeyBindFromKey(key);

  if (mcKeyBind == null || mcKeyBind == undefined) {
    mcKeyBind = new KeyBind(description, key);
  }

  return mcKeyBind;
}

if(Server.getIP() == "mc.hypixel.net"){
  register("tick",eventloop)
}

var startTime = 0;
var ahcall = false;
var bincall = false;
function eventloop(){
  startTime++;
  if(guiKeyBind.isPressed()){
     SettingsUI.openGUI();
  }


  if(startTime >= 1200){
    startTime = 0;
    if(SettingsStore.binenabled == true && ahcall == false){
      ahcall = true;

      request({
        'method':'POST',
          url: 'https://projectscyllbin.herokuapp.com/api/v1/nitric/binsnipe/advise',
          body:{
            'profit': parseInt(SettingsStore.binrange)
          },
          json: true,
          })
          .then(function(response) {
            ahcall = false;
            var clickableMessage = new Message(
              `&3found a BIN snipe! ` ,
              new TextComponent("&3&l(Hover for more details) ").setHoverValue(`Item: ${response.random.item.item}, Usual price: ${nFormatter(response.random.usual.price,2)}, Auction price: ${nFormatter(response.random.item.price,2)}, Profit: ${nFormatter(response.random.usual.price - response.random.item.price,2)}`),
               new TextComponent("&b&l&oclick here!").setClick("run_command", "/viewauction " + response.random.item.aucid),
            );
              ChatLib.chat(clickableMessage)
          }).catch(function(e){
            ahcall = false;
            console.log(e);
        });
    }

    if(SettingsStore.ahenabled == true && bincall == false){
      bincall = true;
      request({
        'method':'POST',
          url: 'https://projectscyll.herokuapp.com/api/v1/nitric/auction/advise/profit/rt',
          body:{
            'profit': parseInt(SettingsStore.ahrange)
          },
          json: true,
          })
          .then(function(response) {
            bincall = false;
            var clickableMessage = new Message(
              `&6found an AH flip! ` ,
              new TextComponent("&6&l(Hover for more details) ").setHoverValue(`Item: ${response.item.item}, Usual price: ${nFormatter(response.item.normalprice)}, Auction price: ${nFormatter(response.item.curprice)}, Profit: ${nFormatter(response.item.profit)}`),
               new TextComponent("&e&l&oclick here!").setClick("run_command", "/viewauction " + response.item.aucid),
            );
              ChatLib.chat(clickableMessage)
          }).catch(function(e){
            bincall = false;
            console.log(e);
          });
    }


  }

}
