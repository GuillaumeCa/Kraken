import { sendNotification } from '../components/Notification';

export function downloadFile(file, filename) {
  const a = document.createElement('a');
  const blob = new Blob([file], {type: 'application/octet-stream'});
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function handleError(err) {
  sendNotification(`Erreur de chargement`);
  throw err;
}
