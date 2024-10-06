import "@styles/mobile-limiter/mobile-limiter.scss"

const MobileLimiter = (props: {children: JSX.Element | JSX.Element[] | string}) => {
  return (
    <div className="mobile__limiter">
        <div className="limiter__content">
            { props.children }
        </div>
    </div>
  )
}

export default MobileLimiter
