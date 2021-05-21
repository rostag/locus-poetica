var app = Application.currentApplication()
app.includeStandardAdditions = true
  
outputFile = ((app.pathTo("desktop").toString()) + "/message.aiff")
audio = `його 
я згадаю 
мені зозуленька 
боже ледве-ледве тихо 
сонце`;

// app.say(audio, { savingTo: outputFile });

app.say(audio);
