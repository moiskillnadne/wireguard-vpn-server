import express from 'express';

import { TerminalService } from '~/core/utils/terminal/TerminalService';
import { FileSystemService } from '~/core/utils/fileSystem/FileSystemService';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const terminal = new TerminalService(new FileSystemService());

  try {
    const result = terminal.executeScript('/Users/victorryabkov/projects/bash_scripts/test.sh', ['Hello', 'World']);
    res.send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
