import { IonChip, IonIcon } from '@ionic/react';
import { receiptOutline } from 'ionicons/icons';
import { shortenB64 } from '../../utils/compat';
import { useClipboard } from '../../useCases/useClipboard';


export const KeyAbbrev = ({ value }: { value: string }) => {
  const abbrevKey = shortenB64(value);

  return <code>{abbrevKey}</code>;
};

interface KeyChipProps {
  value: string;
  label?: string;
  readonly?: boolean;
  fullValue?: boolean;
}

const KeyChip: React.FC<KeyChipProps> = ({ value, label, readonly, fullValue }) => {
  const { copyToClipboard } = useClipboard();

  const onChipClick = () => {
    if (!readonly) {
      copyToClipboard(value);
    }
  };

  return value ? (
    <IonChip
      onClick={onChipClick}
      style={{ cursor: readonly ? 'default' : 'pointer' }}
    >
      {!readonly && <IonIcon icon={receiptOutline} color="primary"></IonIcon>}
      {label ? <code>{label}</code> : fullValue ? <code>{value}</code> : <KeyAbbrev value={value} />}
    </IonChip>
  ) : null;
};

export default KeyChip;
