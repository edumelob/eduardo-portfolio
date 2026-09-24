const terminalBody = document.getElementById('terminalBody');

const commands = [
  { prompt: 'whoami', output: 'Eduardo Melo Barbosa — Desenvolvedor de Software Júnior' },
  { prompt: 'skills --list', output: 'Python · JavaScript · FastAPI · Docker · IA/LLMs · Power BI' },
  { prompt: 'formacao --status', output: 'Ciência da Computação (Senac) · ADS (UNISA) — em andamento' },
  { prompt: 'status', output: 'Disponível para novas oportunidades ✓' }
];

let cmdIndex = 0;

async function typeText(el, text, speed = 35) {
  for (let i = 0; i < text.length; i++) {
    el.textContent += text.charAt(i);
    await sleep(speed);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTerminal() {
  terminalBody.innerHTML = '';

  for (const cmd of commands) {
    const line = document.createElement('div');
    line.className = 'terminal-line';

    const promptSpan = document.createElement('span');
    promptSpan.className = 'terminal-prompt';
    promptSpan.textContent = '$ ';
    line.appendChild(promptSpan);

    const cmdSpan = document.createElement('span');
    line.appendChild(cmdSpan);
    terminalBody.appendChild(line);

    await typeText(cmdSpan, cmd.prompt, 40);
    await sleep(300);

    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line terminal-output';
    outputLine.textContent = cmd.output;
    terminalBody.appendChild(outputLine);

    await sleep(700);
  }

  const cursorLine = document.createElement('div');
  cursorLine.className = 'terminal-line';
  const finalPrompt = document.createElement('span');
  finalPrompt.className = 'terminal-prompt';
  finalPrompt.textContent = '$ ';
  cursorLine.appendChild(finalPrompt);
  const cursor = document.createElement('span');
  cursor.className = 'terminal-cursor';
  cursorLine.appendChild(cursor);
  terminalBody.appendChild(cursorLine);
}

runTerminal();