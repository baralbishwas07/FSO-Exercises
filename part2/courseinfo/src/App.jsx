const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Part = ({name,exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => {
        return <Part key={part.id} name={part.name} exercises={part.exercises}/>
      })}
    </div>
  )
}

const Total = ({total}) => {
  return (
    <h3>total of {total} exercises</h3>
  )
}

const Course = ({course}) => {

  const {parts} = course
  const total = parts.reduce((sum,part) => sum + part.exercises,0)

  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total total={total}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App