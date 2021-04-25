var app = Application.currentApplication()
app.includeStandardAdditions = true
  
outputFile = ((app.pathTo("desktop").toString()) + "/message.aiff")
audio = 'Hey';

// app.say(audio, {savingTo: outputFile})

app.say(audio)
