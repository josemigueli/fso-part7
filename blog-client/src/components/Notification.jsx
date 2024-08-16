import { useSelector } from 'react-redux'
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
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  return (
    <>
      {notification.type === 'error' ? (
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
    </>
  )
}
export default Notification
