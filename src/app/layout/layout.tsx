import LayoutTapbar from "@/components/layout/layout-tapbar"
import "@styles/layout/layout.scss"

const Layout = (props: {children: string | JSX.Element[] | JSX.Element}) => {
  return (
    <div className="layout">
        <div className="layout__content">{props.children}</div>
        <LayoutTapbar />
    </div>
  )
}

export default Layout
