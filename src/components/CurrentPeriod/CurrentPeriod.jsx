import { Summary } from "components/Summary/Summary"
import { Report } from "components/Report/Report"
import { TotalSum } from "components/TotalSum/TotalSum"

export const CurrentPeriod=()=>{
    return(<>
     <Summary/>
     <TotalSum/>
     <Report/>
    </>
       
    )
}