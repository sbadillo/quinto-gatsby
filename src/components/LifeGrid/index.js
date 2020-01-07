import React from "react"
import ReactTooltip from "react-tooltip"
import styled, { keyframes } from "styled-components"

// import Container from '../components/container'

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  weekNo = ("0" + weekNo).slice(-2)
  return [parseInt(weekNo), d.getFullYear()]
}

var currentYear = new Date().getFullYear()
var currentWeek = getWeekNumber(new Date())

function buildCalendar(lifeSpan) {
  // build empty calendar
  let weeks = []
  for (let y = 0; y < lifeSpan; y++) {
    for (let w = 0; w < 52; w++) {
      weeks.push({
        year: y,
        week: w,
        dateYW: y + startingYear + "-" + w,
        isFuture:
          parseFloat(y + startingYear + "." + (w + 1000)) >
          parseFloat(currentYear + "." + (parseInt(currentWeek) + 1000)),
        isToday:
          parseFloat(y + startingYear + "." + w) ===
          parseFloat(currentYear + "." + currentWeek),
        isBirthday: w === 0,
        event: 0,
      })
    }
  }

  // populate the calendar

  // each event shohuld have start, type and title elements.
  // type of event can be : life, prof, educ
  var myEvents = [
    {
      start: "Oct 22 2018",
      type: "prof",
      title: "Started job at engie",
    },
    {
      start: "Aug 30 2018",
      type: "life",
      title: "Finally got the French residence",
    },
    {
      start: "Sept 29 2017",
      type: "life",
      title: "Started process to get a residence permit in France",
    },
    { start: "Oct 12 2016", type: "life", title: "Moved to Paris, France" },
    {
      start: "Dec 23 2016",
      type: "life",
      title: "temporary visa to come back to France",
    },
    { start: "Dec 08 2016", type: "life", title: "Pacsed with Chan" },
    {
      start: "Dec 05 2015",
      type: "prof",
      title: "Started job at AERSPIRE",
    },
    {
      start: "Aug 01 2015",
      type: "educ",
      title: "Graduated from MSc. Sustainable Energy Technologies",
    },
    {
      start: "Nov 15 2014",
      type: "prof",
      title: "Started work intern in ECN - Solar Energy Application Center",
    },
    {
      start: "Aug 15 2013",
      type: "educ",
      title: "Started Master at Delft University in The Netherlands",
    },
    {
      start: "Aug 01 2013",
      type: "life",
      title: "Was granted scholarship and moved to The Netherlands",
    },
    { start: "Sep 10 2012", type: "life", title: "Met Chan-Théang, Indonesia" },
    {
      start: "Aug 10 2012",
      type: "life",
      title: "Started a long trip through Southeast Asia",
    },
    {
      start: "Mar 01 2012",
      type: "prof",
      title: "Started job at WISE Better Homes, Taranaki New Zealand",
    },
    {
      start: "Sep 01 2011",
      type: "prof",
      title: "Started job energy contract sales agent -_-, New Zealand",
    },
    {
      start: "Aug 01 2011",
      type: "life",
      title: "Started Working Holiday in New Zealand",
    },
    {
      start: "May 15 2011",
      type: "educ",
      title: "Graduated as Industrial and Systems Engineer",
    },
    { start: "Jan 10 2011", type: "prof", title: "Started working at LDM" },
    { start: "Aug 01 2010", type: "prof", title: "Intern at Ford, Mexico" },
    {
      start: "Aug 20 2009",
      type: "educ",
      title: "Moved to Reutlingen University, Germany",
    },
    {
      start: "Aug 01 2006",
      type: "educ",
      title: "Started university at Tec de Monterrey, Mexico",
    },
    { start: "Jul 15 2006", type: "educ", title: "Graduated from highschool" },
    {
      start: "Aug 15 2003",
      type: "educ",
      title: "Started highschool, Hermosillo Mexico",
    },
    { start: "Apr 01 2003", type: "life", title: "Started playing guitar" },
  ]

  // iterate through events array and
  myEvents.forEach(e => {
    var d = getWeekNumber(new Date(e.start))
    e["eventYW"] = d[1] + "-" + d[0]

    var index = weeks.findIndex(function(d) {
      return d.dateYW === e.eventYW
    })

    weeks[index].event = e.title
    weeks[index].type = e.type
  })

  return weeks
}

// Parameters for grid construction
var startingYear = 1988 // year of birth
var lifeSpan = 93 // max life years

let weeks = buildCalendar(lifeSpan)

// ==== Styled Components ====

const ContainerWeeks = styled.div`
  grid-column: span 10;
  margin: 5% 0px;
  max-width: 820px;
  height: 100%;
  display: grid;
  grid-gap: 2px;
  grid-template-columns: repeat(52, 1fr);
  grid-template-rows: repeat(${lifeSpan}, 1fr);
`

const Week = styled.div`
  background-color: rgb(190, 238, 240);
  border-radius: 30%;
  box-sizing: content-box;
  content: "";
  grid-column: span 1;
  grid-row: span 1;
  height: 10px;
  width: 10px;
  font-size: 8px;
`

//spinning bloc
const blinker = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(260deg);
  }
`

// the "styled(CustomElement)" replaced the old "CustomElement.Extend"

const WeekFuture = styled(Week)`
  background-color: #efefef;
`

const WeekToday = styled(Week)`
  background-color: white;
  box-sizing: border-box;
  border: 1px solid black;
  animation: ${blinker} 1s linear infinite;
`

const WeekBirthday = styled(Week)`
  background-color: cadetblue;

  &.birthdayFuture {
    opacity: 0.4;
  }
`

const WeekEvent = styled(Week)`
  background-color: blue;

  &.educ {
    background-color: red;
  }
  &.life {
    background-color: pink;
  }
  &.prof {
    background-color: green;
  }
`

// ==== End Styled Components ====

const LifeGrid = () => (
  <ContainerWeeks>
    {weeks.map((w, i) =>
      w.event ? (
        <WeekEvent key={i} className={w.type} data-tip={w.event} />
      ) : w.isBirthday ? (
        w.isFuture ? (
          <WeekBirthday
            key={i}
            className="birthdayFuture"
            data-tip={"will turn " + w.year}
          />
        ) : (
          <WeekBirthday key={i} data-tip={"turns " + w.year} />
        )
      ) : w.isFuture ? (
        <WeekFuture key={i} />
      ) : w.isToday ? (
        <WeekToday key={i} data-tip="life is now" />
      ) : (
        <Week key={i} />
      )
    )}
    <ReactTooltip type="light" />
  </ContainerWeeks>
)

export default LifeGrid

//Trying to do the same thing but more elegantly here...:

// const Week2 = styled.div`
//   background-color: rgb(190, 238, 240);
//   border-radius: 30%;
//   box-sizing: content-box;
//   content: '';
//   grid-column: span 1;
//   grid-row: span 1;
//   height: 10px;
//   width: 10px;
//   font-size: 8px;

//   &.isFuture {
//     opacity: 0.5;
//   }

//   &.isBirthday {
//     background-color: cadetblue;
//   }
// `

// console.log(weeks)

// export default () => (
//   <Container>
//     <ContainerWeeks>
//       {weeks.map((obj, id) => (
//         <Week2
//           key={id}
//           event-title={obj.title}
//           event-type={obj.type}
//           data-tip={obj.event}
//         />
//       ))}
//     </ContainerWeeks>
//   </Container>
// )
