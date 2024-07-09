import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  return (
    <div
      className={
        notification.type === 'ERROR'
          ? 'notification-error'
          : 'notification-success'
      }>
      <h2>{notification.message}</h2>
    </div>
  )
}
export default Notification
