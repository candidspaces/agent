import { useIonToast } from '@ionic/react';

export const useClipboard = () => {
  const [present] = useIonToast();

  const copyToClipboard = (message: string) => {
    navigator.clipboard.writeText(message);
    present({
      message: 'Copied.',
      duration: 1200,
      position: 'bottom',
    });
  };

  return {
    copyToClipboard,
  };
};
