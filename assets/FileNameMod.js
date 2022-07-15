const Path = require("path");
const FS   = require("fs");

function RemoveSpace(Absolute){
  nameOut = Absolute;
  if (nameOut.includes(" ")) {
    nameOut = Absolute.replace(/ /g, "-");
    FS.rename(Absolute,nameOut, (err) => {
      if (err) console.log(err)
    });
    console.log(nameOut);
  }
  return nameOut;
}

function RemoveSpacesFromAll(Directory) {
  FS.readdirSync(Directory).forEach(File => {
    Absolute = Path.join(Directory, File);
    newDIR = RemoveSpace(Absolute);
    try {
      if (FS.existsSync(newDIR) && FS.statSync(newDIR).isDirectory())
        return RemoveSpacesFromAll(newDIR);
      else return;
    } catch (error) {
      console.log(error);
    }
});
}

console.log("Files renamed to:")

imagePath = Path.join(__dirname,"images");
RemoveSpacesFromAll(imagePath);

console.log("Files cleaned.")


