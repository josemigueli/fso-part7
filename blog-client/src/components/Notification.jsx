import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  return (
    <div
      className={
        notification.type === 'error'
          ? 'notification-error'
          : 'notification-success'
      }>
      <h2>{notification.message}</h2>
    </div>
  )
}
export default Notification
