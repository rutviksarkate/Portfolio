import cn from '../lib/cn.js'

export default function Container({ children, className }) {
  return (
    <div className={cn('mx-auto w-full max-w-[1120px] px-5 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
