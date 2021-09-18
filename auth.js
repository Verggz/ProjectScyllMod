import FileManager from './FileManager';

class Authenticator{
  static AUTH_KEY = "";

  //THIS FUNCTION CURRENTLY DOESNT WORK
  static InitKey(){
    const data = FileManager.ReadFile("projectscyll","auth.json")

    if(data){
      console.log(data.key);
      Authenticator.AUTH_KEY = data.key;
    }else{
      Authenticator.AUTH_KEY = "nokey";
    }


  }

  static UpdateKey(key = "nokey"){
    FileManager.WriteFile("ProjectScyll","auth.json",JSON.stringify({"key":key}));

    Authenticator.AUTH_KEY = key;
  }
  static VerifyKey(){
    //Authenticator.AUTH_KEY
  }
}

export default Authenticator;
