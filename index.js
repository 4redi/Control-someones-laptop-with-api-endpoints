const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

const lockPc = () => {
  if (process.platform === 'win32') {
    return exec('rundll32.exe user32.dll,LockWorkStation');
  }

  if (process.platform === 'darwin') {
    return exec('osascript -e "tell application \\"System Events\\"" -e "keystroke \\"q\\" using {command down, control down}" -e "end tell"');
  }
  
  if (process.platform === 'linux') {
    return exec('gnome-screensaver-command -l');
  }

  return null;
};

app.get('/lock', (req, res) => {
  lockPc();

  res.send('PC is being locked!');
});

app.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
