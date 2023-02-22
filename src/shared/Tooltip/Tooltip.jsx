import css from './Tooltip.module.css'

export default function Tooltip({children}) {
  return (
    <div className={css.tooltip__box}>
      <div className={css.tooltip__arrow}></div>
      {children}
    </div>
  )
}
