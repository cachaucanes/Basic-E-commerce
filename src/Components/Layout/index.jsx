import React from 'react'

function Layout({children, classDefault='mt-20'}) {
  return (
    <div className={`flex flex-col items-center ${classDefault}`}>
        {children}
    </div>
  )
}

export default Layout