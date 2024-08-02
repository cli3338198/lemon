export default function createTestTemplate(code: string, test: string) {
  return `
  ${code}

  ${test}
  `;
}
