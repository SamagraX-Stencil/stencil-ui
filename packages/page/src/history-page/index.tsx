import { FC, useCallback, useEffect, useState } from 'react';
import styles from './style.module.css';

import { List } from '@repo/molecules';
import { IconButton } from '@mui/material';
import { DeleteOutline, Forum } from '@mui/icons-material';
import moment from 'moment';
import { FullPageLoader } from '@repo/molecules';
import { ChatItem, HistoryItem } from './types';
import { map } from 'lodash';
import sample from './sample.json';
import { useUiConfig, useColorPalates } from '@repo/hooks';

const HistoryPage: FC = () => {
  const config = useUiConfig('component', 'historyPage');

  const [isFetching, setIsFetching] = useState(true);
  const [list, setList] = useState([]);
  const theme = useColorPalates();

  const handleClick = useCallback((activeItem: HistoryItem) => {
    console.log({ activeItem });
  }, []);

  const onSecondaryActionClick = useCallback(
    (activeItem: ChatItem) => () => {
      if (window.confirm('Are you sure you want to delete this conversation?')) {
        setList((prev) => {
          return prev.filter((item: ChatItem) => item.conversationId !== activeItem.conversationId);
        });
      }
    },
    [],
  );

  useEffect(() => {
    setIsFetching(true);
    const historyList = map(sample, (chatItem: ChatItem) => ({
      id: chatItem?.id,
      label: chatItem?.query,
      conversationId: chatItem?.conversationId,
      userId: chatItem?.userId,
      secondaryLabel: config.showTimestamp
        ? moment(chatItem?.updatedAt).format('hh:mm A DD/MM/YYYY')
        : '',
      icon: <Forum style={{ color: theme?.primary?.light }} />,
      secondaryAction: config.allowDelete && (
        <IconButton edge="end" aria-label="comments" onClick={onSecondaryActionClick(chatItem)}>
          <DeleteOutline />
        </IconButton>
      ),
      onClick: handleClick,
      isDivider: true,
    }));
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      setList(historyList);
      setIsFetching(false);
    }, 2000);
  }, [
    handleClick,
    onSecondaryActionClick,
    config.showTimestamp,
    config.allowDelete,
    theme?.primary?.light,
  ]);

  return (
    <>
      <div className={styles.main}>
        <FullPageLoader loading={isFetching} color={theme?.primary?.main} />
        <div className={styles.title} style={{ color: theme?.primary?.main }}>
          {config.title ?? 'No Label Provided'}
        </div>
        <div className={styles.chatList}>
          <List
            items={list}
            noItem={{
              label: config.noItemsText,
              icon: <Forum style={{ color: theme?.primary?.light }} />,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
