import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../utils/appContext';
import { Transaction } from '../utils/appTypes';
import { socketEventListener } from '../utils/compat';

export const usePendingTransactions = (selectedKey: string) => {
  const { requestPendingTransactions } = useContext(AppContext);

  const [pendingTransactions, setPending] = useState<Transaction[]>([]);
  const pendingListenerCleanupRef = useRef<() => void>(() => {});

  const refreshPendingTransactions = useCallback(() => {
    pendingListenerCleanupRef.current();
    pendingListenerCleanupRef.current =
      requestPendingTransactions(selectedKey, (pending) => setPending(pending)) ??
      (() => {});
  }, [requestPendingTransactions, selectedKey]);

  useEffect(() => {
    if (!selectedKey) {
      setPending([]);
      return;
    }

    refreshPendingTransactions();

    const cleanupPushResult = socketEventListener<{
      transaction_id: string;
      error: string;
    }>('push_transaction_result', (data) => {
      if (!data.error) {
        refreshPendingTransactions();
      }
    });

    const cleanupInvBlock = socketEventListener<string[]>(
      'inv_block',
      () => refreshPendingTransactions(),
    );

    return () => {
      cleanupPushResult();
      cleanupInvBlock();
      pendingListenerCleanupRef.current();
      pendingListenerCleanupRef.current = () => {};
    };
  }, [selectedKey, refreshPendingTransactions]);

  return pendingTransactions;
};
