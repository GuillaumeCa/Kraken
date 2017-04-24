export function downloadFile(file, filename) {
  const a = document.createElement('a');
  const blob = new Blob([file], {type: 'application/octet-stream'});
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
