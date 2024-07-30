export function parseVMErrorMessage(errorMessage: string) {
  const regex = /^(.*?) \[<isolated-vm>:(\d+):(\d+)\]$/;
  let message = "";
  let line = 0;
  let column = 0;

  const match = errorMessage.match(regex);

  if (match) {
    message = match[1].trim();
    line = +match[2];
    column = +match[3];
  }

  return formatErrorMessage(message, line, column);
}

function formatErrorMessage(message: string, line: number, column: number) {
  return `
  **Message**: ${
    message || "An unexpected error occurred in the code execution."
  }
  **Location**: Line ${line}, Column: ${column}
  `;
}
