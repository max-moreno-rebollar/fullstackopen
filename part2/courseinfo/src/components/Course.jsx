const Header = ({ name }) => <h2>{name}</h2>

const Content = (props) => (
  <div>
    {
      props.parts.map((part) => (
        <Part key={part.id} part={part}/>
      ))
    }
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p><b>Total of {props.total} exercises</b></p>

const Course = ({ course }) => {
  return(
    <>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total total={course.parts.reduce((sum, curr) => (sum + curr.exercises), 0)}/>
    </>
  )
}

export default Course