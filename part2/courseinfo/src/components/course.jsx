const Header = ({ course }) => {
    return <h1>{course}</h1>
}

const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
}

const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    )
}

const Total = ({ total }) => {
    return (
      <h3>total of {total} exercises</h3>
    )
}

export const Course = ({ courses }) => {
    return(
        <div>
            {courses.map(course => {
                const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
                return (
                    <div key={course.id}>
                        <Header course={course.name}/>
                        <Content parts={course.parts}/>
                        <Total total={total}/>
                    </div>
                )
            })}
        </div>
    )
}
