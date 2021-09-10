class FileManager{
  static WriteFile(mod,filename,data){
    FileLib.write(mod,filename,data);

    return JSON.parse(data);
  }

  static ReadFile(mod,filename){
    return JSON.parse(FileLib.read(mod,filename));
  }
}

export default FileManager;
