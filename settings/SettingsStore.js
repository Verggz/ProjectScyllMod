import request from '../../requestV2';
import Authenticator from '../auth';

class SettingsStore{
  static ahrange = "100000";
  static binrange = "100000";
  static ahenabled = false;
  static binenabled = true;

  //THIS FUNCTION CURRENTLY DOESNT WORK
  static InitSettings(){
    request({
      'method':'GET',
      'url':"http://localhost:8080/api/v1/mod/settings/" + Player.getName() + "?key=" + Authenticator.AUTH_KEY,
      'json':true
    }).then(function(response){
      console.log(response);
      if(response.status == 'success'){
        SettingsStore.ahrange = response.settings.ahprofit;
        SettingsStore.binrange = response.settings.binprofit;
        SettingsStore.ahenabled = response.settings.ahenabled;
        SettingsStore.binenabled = response.settings.binenabled;
      }
    }).catch(function(e){
      console.log(e);
    });
  }

  //THIS FUNCTION CURRENTLY DOESNT WORK
  static UpdateSettings(data){
    request({
      'method':'POST',
      'json':true,
      'url':"http://localhost:8080/api/v1/mod/settings",
      body:{
        key: Authenticator.AUTH_KEY,
        name:Player.getName(),
        settings:data
      }
    }).then(function(res){
      if(res.status == 'success'){

      }else{

      }
    }).catch(function(e){
      console.log(JSON.stringify(e));
    });
  }
}

export default SettingsStore;
