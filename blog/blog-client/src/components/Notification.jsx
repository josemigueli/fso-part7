import { useNotificationValue } from '../NotificationContext'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

const ShowToast = ({ header, message, type }) => {
  return (
    <ToastContainer className='p-3' position='top-center' style={{ zIndex: 1 }}>
      <Toast bg={type}>
        <Toast.Header closeButton={false}>
          <strong className='me-auto'>{header}</strong>
        </Toast.Header>
        <Toast.Body className='text-white'>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  return (
    <div className='notification-container'>
      {notification.type === 'ERROR' ? (
        <ShowToast
          header='Error!'
          message={notification.message}
          type='danger'
        />
      ) : (
        <ShowToast
          header='Done!'
          message={notification.message}
          type='success'
        />
      )}
    </div>
  )
}
export default Notification
