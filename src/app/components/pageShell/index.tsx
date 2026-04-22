import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { discOutline } from 'ionicons/icons';

interface ToolBarButton {
  label: string;
  renderIcon?: () => JSX.Element;
  action: () => void;
}

interface Props {
  onDismissModal?: () => void;
  renderBody: () => JSX.Element;
  tools?: ToolBarButton[];
}

export const PageShell = ({ onDismissModal, renderBody, tools }: Props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {onDismissModal ? (
              <IonButton color="medium" onClick={() => onDismissModal()}>
                Close
              </IonButton>
            ) : (
              <IonChip>
                <IonIcon icon={discOutline} color="primary" />
                <IonLabel>Candid Space</IonLabel>
              </IonChip>
            )}
          </IonButtons>

          {!!tools?.length && (
            <IonButtons slot="end">
              {tools.map((tool) => (
                <IonButton key={tool.label} onClick={tool.action}>
                  {tool.renderIcon ? tool.renderIcon() : tool.label}
                </IonButton>
              ))}
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{renderBody()}</IonContent>
    </IonPage>
  );
};
