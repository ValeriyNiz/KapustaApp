import  css from "./TotalSum.module.css"
export const TotalSum=()=>{
return(
    <div className={css.container}>
        <div className={css.wrapper}>
        <div className={css.sumDiv}>
            <p className={css.name}>Expenses:</p>
            <p className={css.sumEx}>- 180.00 UAH. </p>
        </div>
        <div className={css.line}></div>
        <div className={css.sumDiv}>
            <p className={css.name}>Income:</p>
            <p className={css.sumIn}>+ 25000.00 UAH. </p>
        </div>
        </div>
    </div>
)
}