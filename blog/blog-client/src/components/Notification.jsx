import { useSelector } from 'react-redux'

const ShowToast = ({ header, message, type }) => {
  return (
    <div className='fixed left-0 right-0 top-3 flex justify-center'>
      <div
        className={
          type === 'error'
            ? 'border border-zinc-700 rounded-lg py-2 max-w-3xs bg-red-950'
            : 'border border-zinc-700 rounded-lg py-2 max-w-3xs bg-emerald-950'
        }>
        <div className='border-b border-zinc-500 px-4 pb-2'>
          <h3 className='font-bold'>{header}</h3>
        </div>
        <div className='px-4 pt-2'>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  return (
    <div className='notification-container'>
      {notification.type === 'error' ? (
        <ShowToast
          header='Error!'
          message={notification.message}
          type='error'
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
