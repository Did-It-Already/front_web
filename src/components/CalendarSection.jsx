import { useContext, useEffect, useState } from "react";
import MyContext from '../context.js';
import { days, months } from "../assets/constants.js";

function CalendarSection() {
    const {theme} = useContext(MyContext)
    const [hour, setHour] = useState("")
    const [minutes, setMinutes] = useState("")
    const [day, setDay] = useState("")
    const [dayNumber, setDayNumber] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [amPm, setAmPm] = useState("am")

    function updateTime() {
        const currentDate = new Date();
        let currentHour = currentDate.getHours()

        if (currentHour >= 12) {
            setAmPm('pm')
            if (currentHour > 12) {
                currentHour -= 12;
            }
        }else if (currentHour === 0) {
            currentHour = 12;
        }
        setDay(days[currentDate.getDay()]);
        setDayNumber(currentDate.getDate().toString().padStart(2, '0'));
        setMonth(months[currentDate.getMonth()]);
        setYear(currentDate.getFullYear());
        setHour(currentHour.toString().padStart(2, '0'));
        setMinutes(currentDate.getMinutes().toString().padStart(2, '0'));
    }

    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 60000); 
        return () => clearInterval(intervalId);
      }, []);
          
    return (
        <div className={"calendarSectionContainer " + (theme === "light" ? "light" : "dark")}>
            <div className="dateContainer">
                <p className={"dayText"}>
                    {day}
                </p>
                <p className={"dayNumberText"}>
                    {dayNumber}
                </p>
                <p className={"monthText"}>
                    {month}
                </p>
                <p className={"yearText"}>
                    {year}
                </p>
            </div>
            <div className="verticalSeparator"></div>
            <div className="dateContainer">
                <p className={"hourText"}>
                    {hour}
                </p>
                <p className={"minutesText"}>
                    {minutes}
                </p>
                <p className={"amPmText"}>
                    {amPm}
                </p>
            </div>
        </div>
    )
}

export default CalendarSection