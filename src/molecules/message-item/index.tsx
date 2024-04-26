import {
  Bubble,
  Image as Img,
  ScrollView,
  List,
  ListItem,
  FileCard,
  Typing,
} from '@samagra-x/chatui'
import { FC, ReactElement, useCallback, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import styles from './index.module.css'
import RightIcon from './assets/right.tsx'
import SpeakerIcon from './assets/speaker.svg'
import MsgThumbsUp from './assets/msg-thumbs-up.tsx'
import MsgThumbsDown from './assets/msg-thumbs-down.tsx'
import { MessageItemPropType } from './index.d'
import moment from 'moment'
import { JsonToTable } from '../json-to-table/index.tsx'
import { useColorPalates } from '../theme-provider/hooks.ts'

// import BlinkingSpinner from '../blinking-spinner/index';

const MessageItem: FC<MessageItemPropType> = ({
  message,
  themeColor,
  chatUi,
}) => {
  const theme = useColorPalates()

  const [reaction, setReaction] = useState(message?.content?.data?.reaction)
  // @ts-ignore
  const [optionDisabled, setOptionDisabled] = useState(
    message?.content?.data?.optionClicked || false
  )

  useEffect(() => {
    setReaction(message?.content?.data?.reaction)
  }, [message?.content?.data?.reaction])

  const feedbackHandler = useCallback(
    ({ like }: { like: 0 | 1 | -1; msgId: string }) => {
      if (reaction === 0) {
        return setReaction(like)
      }
      if (reaction === 1 && like === -1) {
        return setReaction(-1)
      }
      if (reaction === -1 && like === 1) {
        return setReaction(1)
      }
      setReaction(0)
    },
    [reaction]
  )

  const getLists = useCallback(({ choices }: { choices: any }) => {
    return (
      <List className={`${styles.list}`}>
        {choices?.map((choice: any, index: string) => (
          // {_.map(choices ?? [], (choice, index) => (
          <ListItem
            key={`${index}_${choice?.key}`}
            className={`${styles.onHover} ${styles.listItem}`}
            onClick={(e: any): void => {
              e.preventDefault()
              if (optionDisabled) {
                toast.error(`Cannot answer again`)
              }
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color:
                  content?.data?.position === 'right'
                    ? theme?.primary?.main
                    : optionDisabled
                      ? themeColor.primaryColor.value
                      : theme?.primary?.main,
              }}
            >
              <div>{choice}</div>
              <div style={{ marginLeft: 'auto' }}>
                <RightIcon
                  width="30px"
                  color={
                    optionDisabled
                      ? themeColor.primaryColor.value
                      : theme?.primary?.main
                  }
                />
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    )
  }, [])

  const { content, type } = message

  console.log('here', content)

  const handleAudio = useCallback((url: any) => {
    // console.log(url)
    if (!url) {
      toast.error('No audio')
      return
    }
    // Write logic for handling audio here
  }, [])

  switch (type) {
    case 'loader':
      return <Typing />
    case 'text':
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxWidth: '90vw',
          }}
        >
          <Bubble
            type="text"
            style={
              content?.data?.position === 'right'
                ? {
                    background: theme?.primary?.main,
                    borderRadius: '10px 10px 0 25px',
                    boxShadow: '0 3px 8px rgba(0,0,0,.24)',
                  }
                : {
                    background: themeColor.primaryColor.value,
                    borderRadius: '10px 10px 10px 0',
                    boxShadow: '0 3px 8px rgba(0,0,0,.24)',
                  }
            }
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '1rem',
                color:
                  content?.data?.position === 'right'
                    ? themeColor.primaryColor.value
                    : theme?.primary?.main,
              }}
            >
              {content?.text}{' '}
              {/* {
                content?.data?.position === 'right'
                  ? null
                  : !content?.data?.isEnd
                && <BlinkingSpinner />
              } */}
            </span>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <span
                style={{
                  color:
                    content?.data?.position === 'right'
                      ? themeColor.primaryColor.value
                      : theme?.primary?.main,
                  fontSize: '10px',
                }}
              >
                {moment(
                  content?.data?.sentTimestamp ||
                    content?.data?.repliedTimestamp
                ).format('hh:mm A DD/MM/YYYY')}
              </span>
            </div>
          </Bubble>
          {content?.data?.btns ? (
            <div className={styles.offlineBtns}>
              <button
                onClick={() => window?.location?.reload()}
                style={{
                  border: `2px solid ${theme?.primary?.main}`,
                }}
              >
                Refresh
              </button>
            </div>
          ) : (
            content?.data?.position === 'left' && (
              <div
                style={{
                  display: 'flex',
                  position: 'relative',
                  top: '-10px',
                  justifyContent: 'space-between',
                }}
              >
                {chatUi.allowTextToSpeech && (
                  <div style={{ display: 'flex' }}>
                    <div
                      className={styles.msgSpeaker}
                      onClick={handleAudio}
                      style={
                        !content?.data?.isEnd
                          ? {
                              pointerEvents: 'none',
                              filter: 'grayscale(100%)',
                              opacity: '0.5',
                              border: `1px solid ${theme?.primary?.main}`,
                            }
                          : {
                              pointerEvents: 'auto',
                              opacity: '1',
                              filter: 'grayscale(0%)',
                              border: `1px solid ${theme?.primary?.main}`,
                            }
                      }
                    >
                      <img src={SpeakerIcon} width={15} height={15} alt="" />

                      <p
                        style={{
                          fontSize: '11px',
                          // color: config.theme.primaryColor.value,
                          fontFamily: 'Mulish-bold',
                          display: 'flex',
                          alignItems: 'flex-end',
                          marginRight: '1px',
                          padding: '0 5px',
                          color: `${theme?.primary?.dark}`,
                        }}
                      >
                        {chatUi.textToSpeechLabel}
                      </p>
                    </div>
                  </div>
                )}
                {chatUi.allowFeedback && (
                  <div className={styles.msgFeedback}>
                    <div
                      className={styles.msgFeedbackIcons}
                      style={{
                        border: `1px solid ${theme?.primary?.main}`,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column',
                          paddingRight: '6px',
                        }}
                        onClick={() =>
                          feedbackHandler({
                            like: 1,
                            msgId: content?.data?.messageId,
                          })
                        }
                      >
                        <MsgThumbsUp fill={reaction === 1} width="20px" />
                        <p
                          style={{
                            fontSize: '11px',
                            fontFamily: 'Mulish-bold',
                            color: `${theme?.primary?.dark}`,
                          }}
                        >
                          {chatUi.positiveFeedbackText}
                        </p>
                      </div>
                      <div
                        style={{
                          height: '32px',
                          width: '1px',
                          backgroundColor: theme?.primary?.main,
                          margin: '6px 0',
                        }}
                      ></div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column',
                        }}
                        onClick={() =>
                          feedbackHandler({
                            like: -1,
                            msgId: content?.data?.messageId,
                          })
                        }
                      >
                        <MsgThumbsDown fill={reaction === -1} width="20px" />
                        <p
                          style={{
                            fontSize: '11px',
                            fontFamily: 'Mulish-bold',
                            color: `${theme?.primary?.dark}`,
                          }}
                        >
                          {chatUi.negativeFeedbackText}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )

    case 'image': {
      const url = content?.data?.payload?.media?.url || content?.data?.imageUrl
      return (
        <>
          {content?.data?.position === 'left' && (
            <div
              style={{
                width: '40px',
                marginRight: '4px',
                textAlign: 'center',
              }}
            ></div>
          )}
          <Bubble type="image">
            <div style={{ padding: '7px' }}>
              <Img src={url} width="299" height="200" alt="image" lazy fluid />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end',
                }}
              >
                <span
                  style={{
                    color: themeColor.primaryColor.value,
                    fontSize: '10px',
                  }}
                >
                  {moment(
                    content?.data?.sentTimestamp ||
                      content?.data?.repliedTimestamp
                  ).format('hh:mm A DD/MM/YYYY')}
                </span>
              </div>
            </div>
          </Bubble>
        </>
      )
    }

    case 'file': {
      const url = content?.data?.payload?.media?.url || content?.data?.fileUrl
      return (
        <>
          {content?.data?.position === 'left' && (
            <div
              style={{
                width: '40px',
                marginRight: '4px',
                textAlign: 'center',
              }}
            ></div>
          )}
          <Bubble type="image">
            <div style={{ padding: '7px' }}>
              <FileCard file={url} extension="pdf" />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end',
                }}
              >
                <span
                  style={{
                    color: themeColor.primaryColor.value,
                    fontSize: '10px',
                  }}
                >
                  {moment(
                    content?.data?.sentTimestamp ||
                      content?.data?.repliedTimestamp
                  ).format('hh:mm A DD/MM/YYYY')}
                </span>
              </div>
            </div>
          </Bubble>
        </>
      )
    }

    case 'video': {
      const url = content?.data?.payload?.media?.url || content?.data?.videoUrl
      const videoId = url.split('=')[1]
      return (
        <>
          <Bubble type="image">
            <div style={{ padding: '7px' }}>
              <iframe
                width="100%"
                height="fit-content"
                src={`https://www.youtube.com/embed/` + videoId}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-end',
                }}
              >
                <span
                  style={{
                    color: themeColor.primaryColor.value,
                    fontSize: '10px',
                  }}
                >
                  {moment(
                    content?.data?.sentTimestamp ||
                      content?.data?.repliedTimestamp
                  ).format('hh:mm A DD/MM/YYYY')}
                </span>
              </div>
            </div>
          </Bubble>
        </>
      )
    }
    case 'options': {
      return (
        <>
          <Bubble type="text" className={styles.textBubble}>
            <div style={{ display: 'flex' }}>
              <span className={styles.optionsText}>
                {content?.data?.payload?.text}
              </span>
            </div>
            {getLists({
              choices:
                content?.data?.payload?.buttonChoices ?? content?.data?.choices,
            })}
          </Bubble>
        </>
      )
    }

    case 'table': {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxWidth: '90vw',
          }}
        >
          <div
            className={
              content?.data?.position === 'right'
                ? styles.messageTriangleRight
                : styles.messageTriangleLeft
            }
          ></div>
          <Bubble type="text">
            <div className={styles.tableContainer}>
              <JsonToTable json={JSON.parse(content?.text)?.table} />
            </div>
            <span
              style={{
                fontWeight: 600,
                fontSize: '1rem',
                color:
                  content?.data?.position === 'right'
                    ? theme?.primary?.main
                    : themeColor.primaryColor.value,
              }}
            >
              {`\n` +
                JSON.parse(content?.text)?.generalAdvice +
                `\n\n` +
                JSON.parse(content?.text)?.buttonDescription}
              {getLists({
                choices: JSON.parse(content?.text)?.buttons,
              })}
            </span>
          </Bubble>
        </div>
      )
    }
    default:
      return (
        <ScrollView
          data={[]}
          // @ts-ignore
          renderItem={(item): ReactElement => <Button label={item.text} />}
        />
      )
  }
}

export default MessageItem
